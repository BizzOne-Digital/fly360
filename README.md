# FLYY 360 – Raw & Reel

Premium 360 Photo Booth & Social Photography website for Rome, GA.

## Project Structure

```
├── frontend/     # React + Vite (public site + admin panel)
└── backend/      # Express + MongoDB API server
```

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with MongoDB, SMTP, and Cloudinary credentials
npm install
npm run seed
npm run dev
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3. Access

- **Website:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin/login
- **API:** http://localhost:5000/api

## Environment Variables

### Backend (.env)

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT tokens |
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP port (587 for TLS) |
| `SMTP_USER` | SMTP username |
| `SMTP_APP_PASSWORD` | App password for SMTP |
| `SMTP_FROM_EMAIL` | From email address |
| `SMTP_FROM_NAME` | From display name |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_EMAIL` | Default admin email |
| `ADMIN_PASSWORD` | Default admin password |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend (.env)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

## Features

- Cinematic luxury-themed public website
- Full booking/inquiry form with email notifications
- Cloudinary media management
- SMTP email service with branded templates
- Admin dashboard with booking, gallery, services, packages, content, and settings management
- Fully responsive design
- SEO optimized with structured data

## Tech Stack

- **Frontend:** React, Vite, React Router, Framer Motion, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Media:** Cloudinary
- **Email:** Nodemailer (App Password SMTP)
- **Auth:** JWT + bcrypt
