# Library-Management-System

The system allows users to manage books in a library with authentication, role-based access control, and full CRUD operations.

-  Features
Authentication
User Registration
User Login
JWT-based authentication
Secure password hashing using bcrypt
Role Based Access Control
- Admin
Add books
Edit books
Delete books
Update book status

-User

View books
Borrow books
Return books
Book Management
Add Book
View Books
Update Book Details
Delete Book
Borrow / Return Books
Book status tracking (available / borrowed)

- Testing

API testing implemented using Jest + Supertest

Each API route has at least one test case

- Tech Stack
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT (jsonwebtoken)
bcryptjs
Jest
Supertest

Frontend

React
TypeScript
TailwindCSS
Axios
React Router


- Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Payal-Hamand/Library-MS.git
cd Library-MS
- Backend Setup

Navigate to backend folder:

cd Backend

Install dependencies:

npm install

Create .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/library
JWT_SECRET=your_secret_key

Run backend server:

npm run dev

or

npm start

Backend will run on:

http://localhost:5000

- Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start React app:

npm start

Frontend will run on:

http://localhost:3000

- Admin Credentials

Use these credentials to login as Admin:

Username: admin
Password: admin123

Admin can:

Add books

Edit books

Delete books

Manage book status

- Running Tests

Backend API tests are implemented using Jest and Supertest.

Run tests from the Backend folder:

cd Backend
npm test

Expected output:

PASS src/tests/auth.test.js
PASS src/tests/books.test.js

Test Suites: 2 passed
Tests: 7 passed

The tests cover:

User registration

User login

Get books

Add book

Update book

Update book status

Delete book

- Security

The application implements several security measures:

Password hashing using bcrypt

JWT authentication

Protected API routes

Role-based authorization

Input validation and error handling

