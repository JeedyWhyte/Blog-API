# Blog-API

A RESTful API for managing blog articles and user authentication built with Express.js and MongoDB.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Technologies](#technologies)

## Features

- User authentication (Signup/Login)
- JWT-based authorization
- Create, read, update, and delete articles
- Search articles
- Input validation with Joi
- Error handling and logging middleware
- Security with Helmet
- CORS enabled

## Project Structure

```
Blog-API/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── config/
│   │   ├── database.js        # MongoDB connection
│   │   └── env.js             # Environment variables validation
│   ├── controllers/
│   │   ├── article.c.js       # Article business logic
│   │   └── user.c.js          # User business logic
│   ├── middlewares/
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── logger.js          # Request logger
│   │   ├── requireauth.js     # JWT authentication
│   │   ├── validate.u.m.js    # User validation rules
│   │   └── validation.m.js    # Article validation rules
│   ├── model/
│   │   ├── article.m.js       # Article schema
│   │   └── user.m.js          # User schema
│   ├── routes/
│   │   ├── article.r.js       # Article routes
│   │   └── user.r.js          # User routes
│   └── utils/
│       └── bcrypt.js          # Password hashing utilities
├── server.js                  # Server entry point
├── package.json               # Dependencies
└── README.md                  # Project documentation
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Blog-API
```

2. Install dependencies:
```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog-api
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### User Endpoints

#### Signup
- **POST** `/signup`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Login
- **POST** `/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

### Article Endpoints

**All article endpoints require authentication (JWT token in Authorization header)**

#### Get All Articles
- **GET** `/articles`
- **Returns:** Array of all articles

#### Search Articles
- **GET** `/articles/search?q=keyword`
- **Returns:** Filtered articles based on search query

#### Get Article by ID
- **GET** `/articles/:id`
- **Returns:** Single article object

#### Create Article
- **POST** `/articles`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```

#### Update Article
- **PUT** `/articles/:id`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```

#### Delete Article
- **DELETE** `/articles/:id`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After logging in or signing up, use the returned token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Session management
- **Bcrypt** - Password hashing
- **Joi** - Schema validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-reload


