# Blog-API

A RESTful API for managing blog articles and user authentication built with Express.js and MongoDB.

## Table of Contents

- [Features](#features)
- [Project layout & navigation](#project-layout--navigation)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Upload rules & examples](#upload-rules--examples)
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
│   │   ├── cloudinary.js      # Cloudinary client config
│   │   ├── database.js        # MongoDB connection
│   │   └── env.js             # Environment variables validation
│   ├── controllers/
│   │   ├── article.c.js       # Article business logic
│   │   └── user.c.js          # User business logic
│   ├── middlewares/
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── logger.js          # Request logger
│   │   ├── requireauth.js     # JWT authentication
│   │   ├── validate.p.m.js    # Article validation rules
│   │   ├── validate.u.m.js    # User validation rules
│   │   └── uploads.js         # Multer + Cloudinary upload middleware (limits)
│   ├── model/
│   │   ├── article.m.js       # Article schema (includes `images` array)
│   │   └── user.m.js          # User schema
│   ├── routes/
│   │   ├── article.r.js       # Article routes (protected)
│   │   └── user.r.js          # User routes (signup/login/upload)
│   └── utils/
│       └── bcrypt.js          # Password hashing utilities
├── uploads/                   # local upload cache (used in development)
├── server.js                  # Server entry point
├── package.json               # Dependencies & scripts
└── README.md                  # Project documentation
```

## Project layout & navigation

Key code locations and how to navigate them:

- `src/middlewares/uploads.js`: Multer + Cloudinary configuration. Enforces 3MB per file and image-only uploads.
- `src/routes/user.r.js`: User routes. Contains:
  - `POST /upload` — temporary profile upload test route using `upload.single('image')`.
  - `POST /signup` and `POST /login` — registration and authentication routes.
- `src/routes/article.r.js`: Article routes (protected by `requireAuth`). Important endpoints:
  - `POST /articles` — creates an article; validation middleware runs, then upload middleware is applied as `upload.array('images', 5)` to accept up to 5 images. Images are saved to Cloudinary and their URLs stored on the Article model in the `images` array.
  - `GET /articles`, `GET /articles/:id`, `PUT /articles/:id`, `DELETE /articles/:id`, `GET /articles/search`
- `src/controllers/article.c.js`: Business logic for article creation, reading, updating, and deletion. On `createArticle`, the controller reads `req.files` (if present) and maps uploaded file `path` values into `article.images`.

## Upload rules & examples

- Allowed image formats: `jpg`, `jpeg`, `png`.
- Maximum single-file size: 3 MB (enforced in `src/middlewares/uploads.js`).
- Profile image endpoint accepts a single file named `image`.
- Article creation accepts up to 5 images using the field name `images` (max 5 files).

Profile image upload (single file, field name `image`):

```bash
curl -X POST \
  -H "Authorization: Bearer <TOKEN>" \
  -F "image=@/path/to/profile.jpg" \
  http://localhost:3000/upload
```

Create article with up to 5 images (field name `images`):

```bash
curl -X POST \
  -H "Authorization: Bearer <TOKEN>" \
  -F "title=My Post" \
  -F "content=Long article content..." \
  -F "images=@/path/to/img1.jpg" \
  -F "images=@/path/to/img2.png" \
  http://localhost:3000/articles
```

If a file exceeds 3MB or is not an image, the upload middleware will reject the request with an error (ensure your client handles and surfaces that error).

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
# Cloudinary env vars (example)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
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
- **Files:** optional `images` (up to 5 files, each <= 3MB)

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