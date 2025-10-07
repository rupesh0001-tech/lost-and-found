# Lost and Found Application

A web application for managing lost and found items, allowing users to report lost items, report found items, and search for matches.

## Features

### User Features
- User registration and authentication
- Report lost items with detailed descriptions and images
- Report found items with detailed descriptions and images
- Search for potential matches between lost and found items

### Admin Features
- Secure admin login with JWT authentication
- View all listings (lost and found items)
- Delete inappropriate content
- Manage user reports

### Security Features
- JWT-based authentication for users and admins
- Environment variables for sensitive information
- Secure password hashing with bcrypt
- Protected admin routes

## Technical Stack

### Frontend
- EJS templates
- Bootstrap for responsive design
- Modular CSS architecture with dedicated CSS files for each view

### Backend
- Node.js and Express.js
- MongoDB for database
- Mongoose for object modeling
- JWT for authentication
- Cloudinary for image storage

## Setup Instructions

1. Install dependencies: `npm install`
2. Configure environment variables in `.env`
3. Start the server: `node app.js`

## Project Structure

```
├── middleware/       # Authentication middleware
├── models/           # MongoDB models
├── public/           # Static assets
│   ├── assets/       # Images and other assets
│   ├── *.css         # Dedicated CSS files for each view
├── routes/           # Express routes
├── views/            # EJS templates
│   ├── partials/     # Reusable template parts
```

## API Endpoints

### User Authentication
- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /logout` - User logout

### Item Management
- `GET /found` - Form to report found items
- `POST /found` - Submit found item report
- `GET /lost` - Form to report lost items
- `POST /lost` - Submit lost item report
- `GET /match` - View potential matches

### Admin Routes
- `GET /admin/login` - Admin login page
- `POST /admin/login` - Admin authentication
- `GET /admin/dashboard` - Admin dashboard (protected)
- `GET /admin/logout` - Admin logout