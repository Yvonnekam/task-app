# HMCTS Task Manager

A full-stack task management system for HMCTS caseworkers to track and create tasks.

## 🚀 Live Demo

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/docs

## 📋 Features

- ✅ Create tasks with title, description, status, and due date/time
- ✅ Input validation with helpful error messages
- ✅ Data persistence using SQLite database
- ✅ RESTful API with proper error handling
- ✅ Responsive React frontend
- ✅ Comprehensive unit tests for backend and frontend

## 🛠️ Tech Stack

### Backend
- **Language**: Node.js (JavaScript)
- **Framework**: Express.js
- **Database**: SQLite3
- **Validation**: Zod
- **Testing**: Jest + Supertest
- **Dev Tools**: Nodemon

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

## 📁 Project Structure

```
hmcts-task-app/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server setup
│   │   ├── db.js              # SQLite database configuration
│   │   ├── validators.js      # Zod validation schemas
│   │   └── routes/
│   │       └── tasks.js       # Task creation endpoint
│   ├── tests/
│   │   └── tasks.test.js      # Backend unit tests
│   ├── package.json
│   └── tasks.db               # SQLite database file
│
└── frontend/
    ├── src/
    │   ├── main.jsx           # React entry point
    │   ├── App.jsx            # Main application component
    │   └── components/
    │       └── TaskForm.jsx   # Task creation form
    ├── tests/
    │   └── App.test.jsx       # Frontend unit tests
	└── setup.js
    ├── index.html
    ├── vite.config.js
    ├── vitest.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation & Setup

#### 1. Clone the repository
```bash
git clone <your-repo-url>
cd hmcts-task-app
```

#### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```
Backend will start on **http://localhost:3000**

#### 3. Setup Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend will start on **http://localhost:5173**

### Running Tests

#### Backend Tests
```bash
cd backend
npm test
```

#### Frontend Tests
```bash
cd frontend
npm test
```

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### **POST /api/tasks**
Create a new task.

**Request Body:**
```json
{
  "title": "Review case ABC123",
  "description": "Review and approve the case documentation",
  "status": "todo",
  "dueDateTime": "2025-12-31T17:00:00.000Z"
}
```

**Field Requirements:**
- `title` (required): String, 1-255 characters
- `description` (optional): String, max 1000 characters
- `status` (required): One of: `"todo"`, `"in_progress"`, `"done"`
- `dueDateTime` (required): ISO 8601 datetime string, must be in the future

**Success Response (201 Created):**
```json
{
  "id": 1,
  "title": "Review case ABC123",
  "description": "Review and approve the case documentation",
  "status": "todo",
  "dueDateTime": "2025-12-31T17:00:00.000Z",
  "createdAt": "2025-12-08T21:30:00.000Z",
  "updatedAt": "2025-12-08T21:30:00.000Z"
}
```

**Error Responses:**

*400 Bad Request - Validation Error:*
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": [
    "title : String must contain at least 1 character(s)",
    "status : Invalid enum value"
  ]
}
```

*400 Bad Request - Business Rule Violation:*
```json
{
  "status": 400,
  "message": "dueDateTime must be in the future"
}
```

*500 Internal Server Error:*
```json
{
  "status": 500,
  "message": "Database error"
}
```

#### **GET /api/tasks**
Retrieve all tasks (for testing/verification).

**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Review case ABC123",
    "description": "Review and approve the case documentation",
    "status": "todo",
    "dueDateTime": "2025-12-31T17:00:00.000Z",
    "createdAt": "2025-12-08T21:30:00.000Z",
    "updatedAt": "2025-12-08T21:30:00.000Z"
  }
]
```

#### **GET /docs**
View simple API documentation in plain text.

## 🗄️ Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  dueDateTime TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
```

## ✅ Validation Rules

1. **Title**: Required, 1-255 characters
2. **Description**: Optional, max 1000 characters
3. **Status**: Must be one of: `todo`, `in_progress`, `done`
4. **Due Date/Time**: 
   - Must be valid ISO 8601 format
   - Must be in the future
   - Frontend uses `datetime-local` input for user convenience

## 🧪 Testing

### Backend Tests Cover:
- ✅ Successful task creation
- ✅ Invalid status rejection
- ✅ Past due date rejection
- ✅ Response format validation

### Frontend Tests Cover:
- ✅ Component rendering
- ✅ UI element presence

## 🔒 Error Handling

The application implements comprehensive error handling:

1. **Client-side Validation**: HTML5 required fields and datetime-local input
2. **Server-side Validation**: Zod schema validation for all inputs
3. **Business Logic Validation**: Due date must be in the future
4. **Database Error Handling**: Try-catch blocks with appropriate error responses
5. **Network Error Handling**: Frontend catches and displays fetch errors

## 🎯 Design Decisions

### Backend
- **SQLite**: Lightweight, file-based database perfect for this use case
- **Zod**: Type-safe validation with excellent error messages
- **Express**: Minimal, flexible framework for RESTful APIs
- **Separation of Concerns**: Routes, database, and validation in separate files

### Frontend
- **React**: Component-based architecture for maintainability
- **Controlled Components**: Form state managed by React
- **Minimal Dependencies**: No UI libraries to keep bundle size small
- **Vite**: Fast development experience with hot module replacement

### Status Values
Chose descriptive enum values:
- `todo`: Task not started
- `in_progress`: Task currently being worked on
- `done`: Task completed

## 👤 Author

Yvonne Kam. 

## 📄 License

This project is created for evaluation purposes as part of a technical assessment.

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure port 3000 is not in use
- Check that all dependencies are installed: `npm install`
- Verify Node.js version: `node --version` (should be v16+)

### Frontend won't start
- Ensure port 5173 is not in use
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Tests failing
- Ensure the database file exists (run backend once to create it)
- Check that all dependencies are installed
- For backend tests, ensure server.js exports the app

### CORS errors
- Verify backend is running on port 3000
- Check that CORS is enabled in server.js
- Ensure frontend is making requests to correct URL

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.