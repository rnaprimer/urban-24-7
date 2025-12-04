# Service Directory Website

A simple, fast, minimal directory website for service providers.

## Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: SQLite (better-sqlite3)

## Setup & Run

### 1. Backend
```bash
cd server
npm install
npm start
```
The server will start on `http://localhost:3001`.

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

## Features
- **Search**: Search by name, location, or description.
- **Filter**: Filter by category.
- **Admin**: Go to `/admin` to add or remove professionals.
