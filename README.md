# Uber App Clone

A full-stack Uber-like ride-hailing application built with a modern tech stack. This project demonstrates real-time ride booking, driver and user authentication, live tracking, and more.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- User and Captain (Driver) authentication (signup/login/logout)
- Book a ride as a user
- Accept/decline ride as a captain
- Real-time ride status updates using WebSockets
- Live location tracking
- Ride history for users and captains
- Token-based authentication with blacklist support

## Tech Stack
- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** (Specify, e.g., MongoDB, if used)
- **WebSockets:** Socket.io

## Project Structure
```
Backend/
  app.js
  server.js
  socket.js
  controllers/
  db/
  middlewares/
  models/
  routes/
  services/
Frontend/
  src/
    components/
    context/
    pages/
  public/
  ...
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Backend Setup
1. Navigate to the `Backend` directory:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (if any, e.g., `.env` for DB connection, JWT secret, etc.)
4. Start the backend server:
   ```sh
   node server.js
   ```
   The backend will run on the port specified in your configuration (default: 5000).

### Frontend Setup
1. Navigate to the `Frontend` directory:
   ```sh
   cd Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

## API Endpoints

### User
- `POST /user/signup` — Register a new user
- `POST /user/login` — User login
- `POST /user/logout` — User logout
- `GET /user/profile` — Get user profile

### Captain
- `POST /captain/signup` — Register a new captain
- `POST /captain/login` — Captain login
- `POST /captain/logout` — Captain logout
- `GET /captain/profile` — Get captain profile

### Ride
- `POST /ride/book` — Book a ride
- `POST /ride/accept` — Captain accepts ride
- `POST /ride/decline` — Captain declines ride
- `GET /ride/history` — Get ride history

### Maps
- `GET /maps/route` — Get route information

> **Note:** See the respective controller and route files in `Backend/routes/` for more details.

## Socket Events
- `connect` / `disconnect`
- `ride:request` — User requests a ride
- `ride:accepted` — Captain accepts ride
- `ride:declined` — Captain declines ride
- `ride:update` — Real-time ride status/location updates

## Folder Details
- **Backend/controllers/**: Business logic for each resource
- **Backend/models/**: Database models/schemas
- **Backend/routes/**: Express route definitions
- **Backend/services/**: Service layer for business logic
- **Backend/middlewares/**: Authentication and other middleware
- **Frontend/src/components/**: React UI components
- **Frontend/src/context/**: React context providers for state management
- **Frontend/src/pages/**: Page-level React components

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License.
