# Eventify

[Live Demo](https://eventify-ochre.vercel.app)
[Backend](https://event-server-ashy.vercel.app)

---

## 👨‍💻 Author

**Junaeid Ahmed Tanim**  
📧 Email: [junaeidahmed979@gmail.com](mailto:junaeidahmed979@gmail.com)  
🌐 Portfolio: [noobwork.me](https://noobwork.me)

---
## Overview
Eventify is a modern, full-stack event management platform that allows users to discover, create, and join events with ease. It provides a seamless experience for both event organizers and attendees, featuring real-time updates, community engagement, and robust event management tools.

## Features
- User authentication (register, login, JWT-based sessions)
- Create, edit, and delete events
- Browse and search for events
- Join and leave events
- Real-time notifications and updates
- Community-focused networking
- Responsive, modern UI (Next.js + Tailwind CSS)
- RESTful API (Express + MongoDB)

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS, Axios, React Query
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, Zod/Joi validation
- **Deployment:** Vercel (frontend & backend)

## Project Structure
```
Ph-task/
  backend/    # Express + TypeScript API
  frontend/   # Next.js + React client
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database (local or cloud)

### Backend Setup
1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   DEFAULT_PASSWORD=your_default_password
   BCRYPT_SALT_ROUNDS=10
   JWT_ACCESS_SECRET=your_jwt_secret
   JWT_ACCESS_EXPIRES_IN=1d
   ```
4. Start the development server:
   ```bash
   npm run start:dev
   ```
   The backend will run on `http://localhost:3333` by default.

### Frontend Setup
1. `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create a `.env.local` for any frontend environment variables (not required by default).
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000` by default.

## API Reference
- The backend exposes a RESTful API for authentication and event management.
- Example requests can be found in `Event management.postman_collection.json`.
- Main endpoints:
  - `POST /auth/register` — Register a new user
  - `POST /auth/login` — Login and receive JWT
  - `GET /auth/me` — Get current user profile (auth required)
  - `POST /events` — Create event (auth required)
  - `GET /events` — List all events
  - `PATCH /events/:id` — Update event (auth required)
  - `DELETE /events/:id` — Delete event (auth required)

## Deployment
- Both frontend and backend are configured for Vercel deployment.
- Backend uses `vercel.json` to serve the compiled `dist/server.js`.
- Frontend uses Next.js default Vercel integration.

## License
MIT

---

> Built with ❤️ for event communities. 