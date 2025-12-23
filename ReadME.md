# Library Management System API

A comprehensive Library Management System built with FastAPI and MongoDB, featuring **54 API endpoints** across 11 modules.

## 🚀 Features

### Core Modules (54 APIs)

1. **Authentication (6 APIs)** - User registration, login, JWT tokens, password reset
2. **Book Management (10 APIs)** - CRUD operations, categories, authors, availability
3. **Member Management (6 APIs)** - Member profiles, search, borrowing history
4. **Transaction System (6 APIs)** - Borrow/return books, overdue tracking, eligibility
5. **Fine Management (4 APIs)** - Fine calculation, payment, waiving
6. **Reservation System (4 APIs)** - Book reservations with queue management
7. **Advanced Search (4 APIs)** - Multi-field search, autocomplete, recommendations
8. **E-Book Management (4 APIs)** - Upload/download e-books, bookmarks (GridFS)
9. **Reporting (5 APIs)** - Borrowing, fines, popular books, custom reports
10. **System Management (5 APIs)** - Settings, health checks, staff administration
11. **AI Assistant (3 APIs)** - Chat bot, natural language queries, analytics

## 📋 Prerequisites

- Python 3.8+
- MongoDB 4.0+
- pip

## 🛠️ Installation

### 1. Clone the repository

```bash
cd Libraray_management_system
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
pip install passlib[bcrypt] python-jose[cryptography] python-multipart
```

### 3. Configure environment variables

Create a `.env` file in the root directory (use `env_template.txt` as reference):

```env
MONGO_URI=mongodb://localhost:27017/Library_Management_System
JWT_SECRET=your-super-secret-key-change-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
FINE_PER_DAY=5.0
MAX_BOOKS_PER_MEMBER=5
LOAN_PERIOD_DAYS=14
```

### 4. Start MongoDB

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

### 5. Run the application

```bash
uvicorn app.main:app --reload --port 3000
```

The API will be available at: `http://localhost:3000`

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/docs
- **ReDoc**: http://localhost:3000/redoc

## 🔐 Authentication

Most endpoints require authentication. To use protected endpoints:

1. **Register a user**:
   ```bash
   POST /auth/register
   {
     "email": "admin@library.com",
     "password": "password123",
     "full_name": "Admin User",
     "role": "admin"
   }
   ```

2. **Login**:
   ```bash
   POST /auth/login
   {
     "email": "admin@library.com",
     "password": "password123"
   }
   ```

3. **Use the JWT token**:
   - Copy the `access_token` from the response
   - Click "Authorize" in Swagger UI
   - Enter: `Bearer <your-token>`

## 📖 API Endpoints Overview

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `POST /auth/logout` - Logout
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `GET /auth/roles` - Get available roles

### Books
- `GET /books` - List books (with pagination & filters)
- `POST /books` - Add new book (librarian+)
- `PUT /books/{id}` - Update book (librarian+)
- `DELETE /books/{id}` - Delete book (librarian+)
- `GET /books/{id}` - Get book details
- `GET /books/categories` - Get all categories
- `GET /books/authors` - Get all authors
- `GET /books/{id}/availability` - Check availability
- `POST /books/upload` - Upload book with cover image (librarian+)

### Members
- `GET /members` - List members (librarian+)
- `POST /members` - Add member (librarian+)
- `PUT /members/{id}` - Update member (librarian+)
- `GET /members/search` - Search members (librarian+)
- `GET /members/{id}/profile` - Get member profile
- `GET /members/{id}/history` - Get borrowing history

### Transactions
- `POST /transactions/borrow` - Borrow a book (librarian+)
- `POST /transactions/return` - Return a book (librarian+)
- `GET /transactions/history` - Get transaction history
- `GET /transactions/overdue` - Get overdue transactions (librarian+)
- `GET /transactions/available-books` - Search available books
- `GET /transactions/eligibility/{member_id}` - Check eligibility (librarian+)

### Fines
- `GET /fines` - List fines (librarian+)
- `POST /fines/{id}/pay` - Pay a fine
- `POST /fines/{id}/waive` - Waive a fine (admin only)
- `GET /fines/summary` - Get fine summary (librarian+)

### Reservations
- `GET /reservations` - List reservations (librarian+)
- `POST /reservations` - Create reservation
- `DELETE /reservations/{id}` - Cancel reservation
- `GET /reservations/queue/{book_id}` - Get reservation queue

### Search
- `POST /search/advanced` - Advanced search with filters
- `GET /search/suggestions` - Get autocomplete suggestions
- `GET /search/recommendations/{member_id}` - Get personalized recommendations
- `POST /search/semantic` - Semantic search

### E-Books
- `GET /ebooks` - List e-books
- `POST /ebooks/upload` - Upload e-book file (librarian+)
- `GET /ebooks/{id}/download` - Download e-book
- `POST /ebooks/{id}/bookmark` - Save bookmark
- `GET /ebooks/{id}/bookmark` - Get bookmark

### Reports
- `GET /reports/borrowing` - Borrowing statistics (librarian+)
- `GET /reports/fines` - Fine statistics (librarian+)
- `GET /reports/popular-books` - Popular books report (librarian+)
- `POST /reports/custom` - Generate custom report (librarian+)
- `POST /reports/export` - Export report (librarian+)

### System
- `GET /system/settings` - Get settings (admin only)
- `PUT /system/settings` - Update settings (admin only)
- `GET /system/health` - Health check
- `GET /system/staff` - List staff (admin only)
- `POST /system/staff` - Add staff member (admin only)

### AI
- `POST /ai/chat` - Chat with AI assistant
- `POST /ai/query` - Natural language database query
- `GET /ai/analytics` - Get AI-powered analytics

## 👥 User Roles

- **Admin**: Full access to all endpoints
- **Librarian**: Manage books, members, transactions, fines
- **Member**: View books, borrow/return, pay fines, reservations

## 🗂️ Project Structure

```
Libraray_management_system/
├── app/
│   ├── main.py                 # FastAPI application entry point
│   ├── cores/
│   │   ├── config.py          # Configuration settings
│   │   └── database.py        # MongoDB connection
│   ├── utils/
│   │   ├── utils.py           # Utility functions (JWT, hashing, fines)
│   │   └── auth.py            # Authentication middleware
│   ├── schemas/               # Pydantic models (11 files)
│   ├── controllers/           # Business logic (11 files)
│   └── routers/               # API routes (11 files)
├── requirements.txt
├── env_template.txt
└── README.md
```

## 🔧 Configuration

Key settings in `.env`:

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens (change in production!)
- `FINE_PER_DAY`: Daily fine amount for overdue books
- `MAX_BOOKS_PER_MEMBER`: Maximum books a member can borrow
- `LOAN_PERIOD_DAYS`: Default loan period

## 📊 Database Collections

- `users` - User accounts
- `books` - Book catalog
- `members` - Member profiles
- `transactions` - Borrowing transactions
- `fines` - Fine records
- `reservations` - Book reservations
- `ebooks` - E-book metadata
- `bookmarks` - Reading bookmarks
- `system_settings` - System configuration

## 🚦 Testing

Visit `http://localhost:3000/docs` and test the endpoints:

1. Register an admin user
2. Login to get JWT token
3. Add some books
4. Create member profiles
5. Test borrow/return flow
6. Check fine calculations
7. Try search and recommendations

## 🤝 Contributing

This is a comprehensive library management system with all essential features. Feel free to extend it with:

- Email notifications
- SMS alerts for overdue books
- Payment gateway integration
- Advanced AI features (OpenAI integration)
- Mobile app integration

## 📝 License

MIT License

## 🙋 Support

For issues or questions, please check the API documentation at `/docs` or create an issue.

---

**Built with ❤️ using FastAPI and MongoDB**
