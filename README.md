# Task Manager - MERN Stack Application

A full-stack task management web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Mark tasks as completed or pending
- Search tasks by title or description
- Filter tasks by status (all / pending / completed)
- Pagination (6 tasks per page)
- Responsive UI with form validation
- Protected API routes

## Tech Stack

**Frontend:** React 18, React Router 6, Axios, React Hot Toast, Vite  
**Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs  
**Database:** MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd task-manager
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (or use the existing one):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here
```

Start the backend server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the frontend dev server:

```bash
npm run dev
```

The client will run on `http://localhost:3000`.

### 4. Open the App

Visit `http://localhost:3000` in your browser. Register a new account and start managing tasks.

## API Endpoints

| Method | Endpoint         | Description        | Auth Required |
|--------|------------------|--------------------|---------------|
| POST   | /api/auth/register | Register user      | No            |
| POST   | /api/auth/login    | Login user         | No            |
| GET    | /api/auth/me       | Get current user   | Yes           |
| GET    | /api/tasks         | Get tasks (paginated, searchable, filterable) | Yes |
| GET    | /api/tasks/:id     | Get single task    | Yes           |
| POST   | /api/tasks         | Create task        | Yes           |
| PUT    | /api/tasks/:id     | Update task        | Yes           |
| DELETE | /api/tasks/:id     | Delete task        | Yes           |

## Project Structure

```
task-manager/
├── server/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── context/AuthContext.jsx
│       ├── utils/api.js
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── PrivateRoute.jsx
│       │   ├── TaskForm.jsx
│       │   ├── TaskList.jsx
│       │   └── TaskItem.jsx
│       └── pages/
│           ├── Login.jsx
│           ├── Register.jsx
│           └── Dashboard.jsx
└── README.md
```
