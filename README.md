# Task Manager Application

A simple Task Manager application built with **Next.js & react (frontend)** and **Node.js/Express (backend)** with **JWT-based authentication**. Users can register, login, manage tasks (CRUD), and update their profile.

---

## Features

- User Registration & Login with JWT authentication
- Create, Read, Update, Delete (CRUD) tasks
- User profile view and update (name, email, password)
- Form validation and error handling
- Responsive UI using Bootstrap
- Persisted JWT authentication for session management

---

## Tech Stack

- **Frontend:** Next.js, React, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Bootstrap

---

## Folder Structure

task-manager/
│
├─ backend or server/src
│ ├─ config/ # for mongodb connection
  ├─ controllers/ 
  ├─ models/ # Mongoose schemas
│ ├─ routes/ # API routes
│ ├─ middleware/ # Authentication middleware
│ ├─ server.js # Main backend entry
│
├─ frontend or client/
│ ├─ src/
│ │ ├─ pages/ # Next.js pages (Login, Register, Tasks, Profile)
│ │ ├─ components/ # Reusable components (Navbar, etc.)
│ │ ├─ context/ # AuthContext for authentication
│ │ ├─ lib/ # Axios API setup
│
├─ package.json # Frontend or root package
├─ README.md



---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SheetalBatham/Task-Manager.git
cd task-manager
```
### 2. Backend Setup

```bash
cd server
npm install
```

Create a .env file in the backend folder:

```bash
PORT=5000
MONGO_URI=<YOUR_MONGODB_URI>
JWT_SECRET=<YOUR_SECRET_KEY>
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:3000
```


Run the backend server:

```bash
npm run dev
```


The backend server should now be running at http://localhost:5000.

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a .env.local file in the frontend folder:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```


Run the frontend server:

```bash
npm run dev
```

The frontend will be available at http://localhost:3000.

**Usage**

Open http://localhost:3000.

- Register a new user or login with existing credentials.
- Access the Task List page to view your tasks.
- Create, edit, or delete tasks as needed.
- Update profile information from the Profile page.

### 4. API Endpoints

**Auth**

- POST /api/auth/register – Register new user
- POST /api/auth/login – Login and get JWT token
- GET /api/auth/me – Get current logged-in user
- PUT /api/auth/update-profile - for profile name & email update
- PUT /api/auth//change-password - for logged in user password changed

**Tasks**

- GET /api/tasks – Get all tasks for logged-in user
- POST /api/tasks – Create a new task
- GET /api/tasks/:id – Get task details
- PUT /api/tasks/:id – Update a task
- DELETE /api/tasks/:id – Delete a task
- All task routes require Authorization header:

**Notes**

- Passwords are hashed using bcrypt before storing in the database.
- JWT is used to secure protected routes.
- Frontend persists JWT in localStorage for session continuity.
