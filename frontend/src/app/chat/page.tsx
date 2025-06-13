'use client';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const seller = searchParams.get('seller') || 'Продавец';
  const [messages, setMessages] = useState([
    { from: 'seller', text: `Здравствуйте! Чем могу помочь?` },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { from: 'buyer', text: input },
      { from: 'seller', text: 'Спасибо за ваш вопрос! Мы ответим в ближайшее время.' },
    ]);
    setInput('');
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Чат с продавцом: {seller}</h1>
      <div className="border rounded-lg bg-white p-4 h-96 overflow-y-auto flex flex-col gap-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === 'buyer' ? 'text-right' : 'text-left'}>
            <span className={msg.from === 'buyer' ? 'inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-lg' : 'inline-block bg-gray-100 text-gray-900 px-3 py-1 rounded-lg'}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="input-field flex-1"
          placeholder="Введите сообщение..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button className="btn-primary" onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
} 