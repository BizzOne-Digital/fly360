# FLYY 360 Backend API

REST API server for FLYY 360 – Raw & Reel.

## Setup

```bash
cp .env.example .env
# Edit .env with your credentials
npm install
npm run seed
npm run dev
```

## Environment Variables

See `.env.example` for all required variables.

## API Endpoints

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `POST /api/bookings` - Create booking (public)
- `GET /api/bookings` - List bookings (admin)
- `GET /api/gallery` - List gallery items
- `GET /api/services` - List services
- `GET /api/packages` - List packages
- `GET /api/content` - Get website content
- `GET /api/content/settings` - Get site settings
