from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.models.chat import Chat, Message
from app.schemas.chat import (
    Chat as ChatSchema,
    ChatCreate,
    Message as MessageSchema,
    MessageCreate,
    ChatFilter,
)

router = APIRouter()

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_personal_message(self, message: str, user_id: int):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(message)

manager = ConnectionManager()

@router.get("/", response_model=List[ChatSchema])
def list_chats(
    *,
    db: Session = Depends(get_db),
    filter: ChatFilter = Depends(),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Retrieve chats with filtering and pagination.
    """
    query = db.query(Chat).filter(
        (Chat.buyer_id == current_user.id) | (Chat.seller_id == current_user.id)
    )
    
    if filter.product_id:
        query = query.filter(Chat.product_id == filter.product_id)
    
    # Apply pagination
    total = query.count()
    chats = query.offset((filter.page - 1) * filter.per_page).limit(filter.per_page).all()
    
    return chats

@router.post("/", response_model=ChatSchema)
def create_chat(
    *,
    db: Session = Depends(get_db),
    chat_in: ChatCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new chat.
    """
    # Check if chat already exists
    existing_chat = db.query(Chat).filter(
        Chat.buyer_id == current_user.id,
        Chat.seller_id == chat_in.seller_id,
        Chat.product_id == chat_in.product_id
    ).first()
    
    if existing_chat:
        return existing_chat
    
    chat = Chat(
        buyer_id=current_user.id,
        seller_id=chat_in.seller_id,
        product_id=chat_in.product_id
    )
    
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return chat

@router.get("/{chat_id}", response_model=ChatSchema)
def get_chat(
    *,
    db: Session = Depends(get_db),
    chat_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get chat by ID.
    """
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.buyer_id != current_user.id and chat.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return chat

@router.post("/{chat_id}/messages", response_model=MessageSchema)
def create_message(
    *,
    db: Session = Depends(get_db),
    chat_id: int,
    message_in: MessageCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new message.
    """
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    if chat.buyer_id != current_user.id and chat.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    message = Message(
        chat_id=chat_id,
        user_id=current_user.id,
        content=message_in.content
    )
    
    db.add(message)
    db.commit()
    db.refresh(message)
    return message

@router.websocket("/ws/{chat_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    WebSocket endpoint for real-time chat.
    """
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not chat:
        await websocket.close(code=4004)
        return
    if chat.buyer_id != current_user.id and chat.seller_id != current_user.id:
        await websocket.close(code=4003)
        return
    
    await manager.connect(websocket, current_user.id)
    try:
        while True:
            data = await websocket.receive_text()
            message = Message(
                chat_id=chat_id,
                user_id=current_user.id,
                content=data
            )
            db.add(message)
            db.commit()
            db.refresh(message)
            
            # Send message to the other user
            other_user_id = chat.seller_id if current_user.id == chat.buyer_id else chat.buyer_id
            await manager.send_personal_message(data, other_user_id)
    except WebSocketDisconnect:
        manager.disconnect(current_user.id) 