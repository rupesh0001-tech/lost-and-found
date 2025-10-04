# Overview

This is a Lost and Found web application built for a college environment. The system allows users to report lost items and search for found items by matching keywords and locations. The application uses a matching algorithm to suggest potential matches between lost item descriptions and found items in the database.

**Recent Changes (October 4, 2025)**:
- Configured for Replit environment with port 5000 and 0.0.0.0 binding
- Protected admin route with authentication middleware
- Enhanced UI/UX with modern CSS styling (gradient buttons, smooth animations, improved forms)
- Added root route ("/") that redirects to login or home based on auth status
- Configured MongoDB to run locally with startup script
- Set up deployment configuration for VM deployment

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Backend Framework
**Technology**: Express.js (Node.js)

**Rationale**: Express provides a lightweight, flexible framework for building the web server and API routes. The MVC-like pattern separates concerns with dedicated route handlers, models, and views.

**Key Design Decisions**:
- Route-based organization with separate router modules for users, listings, admin, and home
- Middleware pipeline for cookie parsing, authentication, and request body parsing
- EJS templating for server-side rendering

## Database Layer
**Technology**: MongoDB with Mongoose ODM

**Connection**: Direct MongoDB connection to localhost (`mongodb://127.0.0.1:27017/lostandfind`)

**Schema Design**:
- **User Model**: Stores user credentials (name, age, email, phone, hashed password)
- **Item Model**: Stores lost/found item information (title, description, location, image URL, author reference)
- Relationship: Items reference Users through the `Author` field using MongoDB ObjectId references

**Rationale**: MongoDB provides flexible document storage suitable for varying item descriptions. Mongoose adds schema validation and simplified query operations.

## Authentication & Authorization
**Mechanism**: JWT (JSON Web Tokens) stored in HTTP-only cookies

**Flow**:
1. User registers/logs in → server generates JWT with email payload
2. Token stored in cookie with 1-hour expiration
3. Protected routes use `requireAuth` middleware to verify token validity
4. Invalid/expired tokens trigger redirect to login page

**Security Considerations**:
- Passwords hashed using bcrypt (10 salt rounds)
- Token secret currently hardcoded as 'SECRET_KEY' (should be environment variable)
- Cookie-based storage prevents XSS attacks on token

## Item Matching Algorithm
**Technology**: keyword-extractor npm package

**Matching Logic**:
1. Extract keywords from lost item description (normalized to lowercase, preserves numbers)
2. Filter items by matching location
3. Compare extracted keywords against stored `describtionArr` (pre-processed keywords) for each item
4. Items with 3+ matching keywords are returned as potential matches

**Rationale**: Keyword-based matching provides fuzzy matching capabilities without requiring exact text matches, improving user experience when descriptions vary slightly.

## Frontend Architecture
**Technology**: EJS (Embedded JavaScript Templates) with vanilla CSS

**Structure**:
- Server-side rendered pages for all views
- Separate CSS files for different sections (home.css, found.css, match.css, style.css)
- Authentication state passed to templates via `isAuth` variable
- Static assets served from `/public` directory

**Rationale**: Server-side rendering simplifies authentication state management and reduces client-side complexity for a relatively simple UI.

## Route Organization
- **Home Routes** (`/`, `/home`): Landing pages with auth redirects
- **User Routes** (`/register`, `/login`): Authentication endpoints
- **Listing Routes** (`/lost`): Lost item reporting and matching
- **Admin Routes** (`/admin`): Administrative item viewing (protected)

# External Dependencies

## Core Runtime Dependencies

**express** (v5.1.0): Web application framework for routing and middleware

**mongoose** (v8.18.3): MongoDB object modeling and connection management

**bcrypt** (v6.0.0): Password hashing for secure credential storage

**jsonwebtoken** (v9.0.2): JWT generation and verification for authentication

**cookie-parser** (v1.4.7): HTTP cookie parsing middleware

**ejs** (v3.1.10): Template engine for server-side HTML rendering

**keyword-extractor** (v0.0.28): Natural language processing for keyword extraction from item descriptions

## Database
**MongoDB**: NoSQL database running locally on port 27017

Database name: `lostandfind`

No external database service currently configured (local development setup)

## Missing Production Considerations
- No environment variable management (dotenv)
- Hardcoded JWT secret and database connection strings
- No external file storage service for item images (currently stores URLs only)
- No email service integration for notifications
- No payment gateway or external API integrations