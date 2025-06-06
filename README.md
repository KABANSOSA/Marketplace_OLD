# Marketplace for Special Equipment Parts

A full-featured marketplace platform for buying and selling special equipment parts across Russia.

## Features

- Modern, responsive UI/UX design
- Multi-role user system (Guest, Buyer, Seller, Admin)
- Advanced product catalog with search and filters
- Real-time chat between buyers and sellers
- Seller dashboard with analytics
- Admin panel for platform management
- Mobile-friendly interface
- Multi-region support

## Tech Stack

### Frontend
- Next.js 14 with TypeScript
- TailwindCSS for styling
- React Query for data fetching
- Zustand for state management
- Socket.io-client for real-time features

### Backend
- FastAPI (Python)
- PostgreSQL with pg_trgm for full-text search
- Redis for caching and real-time features
- MinIO for file storage (S3-compatible)
- JWT for authentication

### Infrastructure
- Docker & Docker Compose
- Nginx as reverse proxy
- GitHub Actions for CI/CD

## Project Structure

```
marketplace/
├── frontend/           # Next.js frontend application
├── backend/           # FastAPI backend application
├── docker/            # Docker configuration files
└── docs/             # Project documentation
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/marketplace.git
cd marketplace
```

2. Start the development environment:
```bash
docker-compose up -d
```

3. Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Admin Panel: http://localhost:3000/admin

### Environment Variables

Create `.env` files in both frontend and backend directories based on the provided `.env.example` files.

## Development

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

## Deployment

The project includes Docker configurations for production deployment. Use the provided docker-compose.prod.yml file for production setup.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 