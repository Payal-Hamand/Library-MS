# Library-Management-System

A Full-Stack Library Management System with JWT Authentication and Role-Based Access Control.

- Tech Stack

Backend

Node.js

Express.js

MongoDB

JWT Authentication

bcrypt (password hashing)

Frontend

React (TypeScript)

TailwindCSS

Axios

React Router

- Features

User Login & Logout

JWT-based authentication

Role-based access control (Admin / User)

Book CRUD operations

Borrow / Return functionality

Protected routes

- Setup Instructions
1️⃣ Clone Project
git clone (https://github.com/Payal-Hamand/Library-Management-System.git)
2️⃣ Backend Setup
cd Backend
npm install

Create .env file inside Backend folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/libraryDB
JWT_SECRET=yourSecretKey

Start backend:

npm run dev

Backend runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000

*** Admin Credentials

Use these credentials to login as Admin:

Username: admin
Password: admin123

(Admin can add, delete, and manage books)

-  API Endpoints
Auth

POST /auth/register

POST /auth/login

Books

GET /books (Authenticated)

POST /books (Admin only)

PUT /books/:id (Admin only)

DELETE /books/:id (Admin only)

PATCH /books/:id/status

- Security

Passwords hashed using bcrypt

JWT with 1 hour expiration

Protected backend routes

Role-based authorization middleware