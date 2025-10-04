# Overview

This is a Lost and Found web application built for a college environment. The system allows users to report lost items and search for found items by matching keywords and locations. The application uses a matching algorithm to suggest potential matches between lost item descriptions and found items in the database.

**Recent Changes (October 4, 2025)**:
- **Admin Authentication System**: Created separate admin model with dedicated login portal (/admin/login) requiring special credentials (default: admin/admin123 - change after first login)
- **User Reports Feature**: Added /report route showing each user's own lost and found items with statistics and tabbed interface
- **Item Status Tracking**: Updated Item model to include 'status' field (lost/found) for better organization
- **Enhanced Forms**: Added title and image fields to lost item reports; all items now linked to user accounts
- **Modern UI Enhancements**: 
  - New stock images for login and register pages
  - Footer component added to all pages with quick links and contact info
  - Gradient buttons with hover animations throughout
  - Improved card designs with shadow effects
  - Responsive layouts for mobile devices
- **Configured for Replit**: Port 5000 with 0.0.0.0 binding, MongoDB startup script, VM deployment ready

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
- **Admin Model**: Stores admin credentials (username, password, role) with separate authentication flow
- **Item Model**: Stores lost/found item information (title, description, location, image URL, status, author reference, keywords array)
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
- All passwords hashed using bcrypt (10 salt rounds)
- Separate JWT tokens for users and admins with different secret keys
- User token: 'SECRET_KEY', Admin token: 'ADMIN_SECRET_KEY'
- Cookie-based storage prevents XSS attacks on tokens
- Admin authentication uses separate middleware (`requireAdminAuth`)
- **Important**: Default admin credentials (admin/admin123) should be changed after first login

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
- **User Routes** (`/register`, `/login`, `/logout`): User authentication endpoints
- **Listing Routes** (`/lost`, `/found`, `/report`): 
  - `/lost`: Report lost items and search for matches
  - `/found`: Report found items
  - `/report`: View user's own lost and found item reports
- **Admin Routes** (`/admin/login`, `/admin/dashboard`, `/admin/logout`): 
  - Separate admin authentication system
  - Dashboard shows all items from all users
  - Protected by `requireAdminAuth` middleware

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