# DriveEasy Car Rental System

A full-stack monorepo web application for browsing, booking, and managing car rentals online.

---

## Project Structure

```
/
├── backend/       # Node.js + Express + Mongoose REST API
├── frontend/      # React (Vite) web application
├── .gitignore
└── README.md
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Himay0217/itue301-exam-set-E-24AIML069-Batch-D.git
cd itue301-exam-set-E-24AIML069-Batch-D
```

---

## Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `/backend/.env`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret
```

### MongoDB Setup

**Local MongoDB:**
1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start the service: `mongod`
3. Set `MONGO_URI=mongodb://localhost:27017/driveeasy`

**MongoDB Atlas (Cloud):**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Whitelist your IP address
3. Copy the connection string and set `MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/driveeasy`

### Start the Backend Server

```bash
node server.js
```

Or using the npm script:

```bash
npm start
```

### Seed Sample Data

```bash
node seed.js
```

---

## Frontend Setup

### Install Dependencies

```bash
cd frontend
npm install
```

### Start the Frontend Dev Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Tech Stack

- **Backend**: Node.js, Express, Mongoose, JWT, bcryptjs
- **Frontend**: React, Vite, react-router-dom
- **Database**: MongoDB
