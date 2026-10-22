# Requirements Document

## Introduction

DriveEasy Car Rental System is a full-stack monorepo web application that enables customers to browse, book, and manage car rentals online. The system is composed of a React-based frontend (bootstrapped with Vite) and a Node.js/Express REST API backend connected to MongoDB via Mongoose. The monorepo is organized into `/frontend` and `/backend` workspaces, managed through a single repository pushed to GitHub. Authentication is handled via JWT and bcryptjs, and all sensitive credentials are managed through environment variables using dotenv.

---

## Glossary

- **System**: The DriveEasy Car Rental System as a whole
- **Backend**: The Node.js + Express + Mongoose REST API server residing in the `/backend` folder
- **Frontend**: The React application (Vite) residing in the `/frontend` folder
- **Monorepo**: A single Git repository containing both `/frontend` and `/backend` workspaces with a shared root configuration
- **User**: An end-user interacting with the Frontend to browse and book cars
- **Admin**: An authenticated user with elevated privileges to manage the car fleet and bookings
- **Car**: A vehicle entity managed by the Backend, available for rental
- **Booking**: A reservation record linking a User to a Car for a specific time period
- **JWT**: JSON Web Token used for stateless authentication
- **MONGO_URI**: The MongoDB connection string stored as an environment variable
- **Seed_Script**: The `seed.js` file that populates the database with initial Car data
- **DB_Config**: The `config/db.js` module responsible for establishing the MongoDB connection

---

## Requirements

### Requirement 1: Monorepo Project Structure

**User Story:** As a developer, I want the project organized as a monorepo with `/frontend` and `/backend` folders, so that both applications are versioned together in a single repository.

#### Acceptance Criteria

1. THE System SHALL contain a `/backend` directory with the following structure: `config/db.js`, `models/`, `controllers/`, `middleware/`, `routes/`, `seed.js`, and `server.js`.
2. THE System SHALL contain a `/frontend` directory scaffolded with Vite (React template) with the following structure: `src/components/`, `src/pages/`, and `src/context/`.
3. THE System SHALL contain a root `.gitignore` file that excludes `node_modules/` and `.env` from version control.
4. THE System SHALL contain a root `README.md` file that includes the project name, the exact commands `npm install` and `node server.js` for the backend, the exact commands `npm install` and `npm run dev` for the frontend, and MongoDB setup steps for both local and Atlas configurations.
5. THE Backend SHALL use CommonJS module syntax (`require`/`module.exports`) in all files under `server.js`, `config/db.js`, `models/`, `controllers/`, `middleware/`, `routes/`, and `seed.js`.
6. THE root `package.json` SHALL declare both `frontend` and `backend` as workspaces, establishing the monorepo structure as an observable artifact.
7. EACH of `/backend` and `/frontend` SHALL contain its own `package.json`, so that each workspace can be installed and run independently.

---

### Requirement 2: Backend Dependencies and Entry Point

**User Story:** As a developer, I want the backend to have all required dependencies installed and a proper entry point, so that the server can be started with a single command.

#### Acceptance Criteria

1. THE Backend SHALL list `express`, `mongoose`, `dotenv`, `cors`, `jsonwebtoken`, and `bcryptjs` as dependencies in `/backend/package.json`.
2. THE Backend SHALL define an npm `start` script in `/backend/package.json` that executes `node server.js`.
3. THE Backend `server.js` SHALL have environment variables accessible to all middleware and route handlers from the first middleware execution, loaded via `dotenv.config()`.
4. WHEN the Backend server starts, THE Backend `server.js` SHALL initialize an Express application and register CORS middleware and JSON body-parsing middleware.
5. WHEN the Backend server starts, THE Backend `server.js` SHALL invoke the DB_Config connection function before the server begins accepting requests.
6. WHEN the Backend server starts successfully, THE Backend SHALL log the server port to the console.
7. IF the DB_Config connection fails on startup, THEN THE Backend SHALL log an error message to the console and exit the process with a non-zero exit code.
8. THE Backend `server.js` SHALL read the `PORT` value from the environment and the `MONGO_URI` value from the environment as required startup variables.

---

### Requirement 3: Database Configuration

**User Story:** As a developer, I want the database connection logic isolated in `config/db.js`, so that MongoDB connectivity is centralized and reusable.

#### Acceptance Criteria

1. THE DB_Config SHALL connect to MongoDB using the `MONGO_URI` environment variable as the connection string.
2. WHEN the MongoDB connection is established successfully, THE DB_Config SHALL log a confirmation message to the console that includes the connected host address.
3. IF the MongoDB connection fails, THEN THE DB_Config SHALL log the error message to the console and terminate the process with a non-zero exit code.
4. THE DB_Config SHALL NOT hardcode any credentials or connection strings.
5. IF the `MONGO_URI` environment variable is undefined or empty, THEN THE DB_Config SHALL log an error message to the console and terminate the process with a non-zero exit code without attempting a connection.

---

### Requirement 4: Environment Variable Management

**User Story:** As a developer, I want all sensitive configuration managed via environment variables, so that credentials are never committed to version control.

#### Acceptance Criteria

1. THE Backend SHALL include a `/backend/.env.example` file containing the keys `MONGO_URI`, `PORT`, and `JWT_SECRET` with placeholder values (`your_mongodb_connection_string`, `5000`, `your_secret` respectively).
2. THE Backend SHALL read the server port from the `PORT` environment variable, defaulting to `5000` if the variable is not set.
3. WHEN the Backend starts, THE Backend SHALL read the JWT signing secret from the `JWT_SECRET` environment variable.
4. IF the `JWT_SECRET` environment variable is absent or empty at startup, THEN THE Backend SHALL log an error message and refuse to start, exiting with a non-zero exit code.
5. THE System SHALL NOT hardcode any credential values, connection strings, or secret keys in any source file.
6. THE Backend `.env` file SHALL be excluded from version control via the root `.gitignore`.

---

### Requirement 5: User Authentication

**User Story:** As a User, I want to register and log in securely, so that I can access personalized rental features and my booking history.

#### Acceptance Criteria

1. WHEN a registration request is received with a valid name (1–100 characters), a valid email (RFC 5322 format, ≤ 254 characters), and a valid password (8–72 characters), THE Backend SHALL hash the password using `bcryptjs` and persist the User document to MongoDB.
2. IF a registration request is received with an email that already exists in the database, THEN THE Backend SHALL return an HTTP 400 response with a descriptive error message.
3. WHEN a login request is received with a valid email and correct password, THE Backend SHALL return an HTTP 200 response containing a signed JWT.
4. IF a login request is received with an invalid email or incorrect password, THEN THE Backend SHALL return an HTTP 401 response with a descriptive error message.
5. THE Backend SHALL sign JWTs using the `JWT_SECRET` environment variable, include the user ID as the token payload, and set the token expiry to 24 hours.
6. THE Backend SHALL define all authentication routes under the `/api/auth` path prefix.
7. IF a registration or login request is received with any required field (name, email, or password) missing or empty, THEN THE Backend SHALL return an HTTP 400 response with a descriptive error message identifying the missing field(s).

---

### Requirement 6: JWT Authentication Middleware

**User Story:** As a developer, I want protected routes to verify JWT tokens automatically, so that only authenticated users can access secured endpoints.

#### Acceptance Criteria

1. THE Backend SHALL provide authentication middleware that intercepts all protected route requests before the route handler is invoked.
2. WHEN a request to a protected route is received with a valid JWT in the `Authorization: Bearer <token>` header, THE Backend SHALL attach the decoded user payload to the request object and pass control to the next handler.
3. IF a request to a protected route is received without an `Authorization` header, THEN THE Backend SHALL return an HTTP 401 response with a "No token, authorization denied" message.
4. IF a request to a protected route is received with an expired JWT, THEN THE Backend SHALL return an HTTP 401 response with a "Token is not valid" message.
5. IF a request to a protected route is received with a JWT that has an invalid signature or is malformed, THEN THE Backend SHALL return an HTTP 401 response with a "Token is not valid" message.
6. IF a request to a protected route is received with an `Authorization` header that is present but not in `Bearer <token>` format, THEN THE Backend SHALL return an HTTP 401 response with a "No token, authorization denied" message.

---

### Requirement 7: Car Fleet Management

**User Story:** As an Admin, I want to manage the car fleet through API endpoints, so that the available cars are always up to date.

#### Acceptance Criteria

1. THE Backend SHALL define a `Car` model that exposes at minimum the data contract: `make` (required), `model` (required), `year` (required), `pricePerDay` (required), `available` (defaults to true), and `imageUrl` (optional).
2. WHEN a GET request is received at `/api/cars`, THE Backend SHALL return an HTTP 200 response with an array of all Car documents.
3. WHEN a GET request is received at `/api/cars/:id` with a valid, existing Car ID, THE Backend SHALL return an HTTP 200 response with the matching Car document.
4. IF a GET request is received at `/api/cars/:id` with a malformed (non-ObjectId) Car ID, THEN THE Backend SHALL return an HTTP 400 response with a descriptive error message.
5. IF a GET request is received at `/api/cars/:id` with a valid-format but non-existent Car ID, THEN THE Backend SHALL return an HTTP 404 response with a descriptive error message.
6. WHEN an authenticated POST request is received at `/api/cars` with a non-empty `make` string, a non-empty `model` string, a positive integer `year`, and a positive number `pricePerDay`, THE Backend SHALL persist the new Car document and return an HTTP 201 response with the created Car.
7. IF an authenticated POST request is received at `/api/cars` with any required field (`make`, `model`, `year`, `pricePerDay`) missing or invalid, THEN THE Backend SHALL return an HTTP 400 response with a descriptive error message and SHALL NOT persist any document.
8. WHEN an authenticated PUT request is received at `/api/cars/:id` with valid fields, THE Backend SHALL update only the provided fields of the Car document and return an HTTP 200 response with the updated Car.
9. IF an authenticated PUT request is received at `/api/cars/:id` with a non-existent Car ID, THEN THE Backend SHALL return an HTTP 404 response with a descriptive error message.
10. WHEN an authenticated DELETE request is received at `/api/cars/:id` for an existing Car, THE Backend SHALL remove the Car document and return an HTTP 200 response with a message confirming the deletion by Car ID.
11. IF an authenticated DELETE request is received at `/api/cars/:id` with a non-existent Car ID, THEN THE Backend SHALL return an HTTP 404 response with a descriptive error message.
12. IF an unauthenticated request is received at POST `/api/cars`, PUT `/api/cars/:id`, or DELETE `/api/cars/:id`, THEN THE Backend SHALL return an HTTP 401 response and SHALL NOT modify any Car document.

---

### Requirement 8: Booking Management

**User Story:** As a User, I want to create and view my bookings, so that I can track my rental reservations.

#### Acceptance Criteria

1. THE Backend SHALL define a `Booking` model with at minimum the fields: `user` (ObjectId ref User, required), `car` (ObjectId ref Car, required), `startDate` (Date, required), `endDate` (Date, required), and `totalPrice` (Number, required).
2. WHEN an authenticated POST request is received at `/api/bookings` with valid booking fields and the referenced Car has `available: true`, THE Backend SHALL persist the Booking document, set the Car's `available` field to `false`, and return an HTTP 201 response with the created Booking.
3. IF an authenticated POST request is received at `/api/bookings` for a Car with `available: false`, THEN THE Backend SHALL return an HTTP 400 response with a "Car is not available" message and SHALL NOT create a Booking document.
4. IF an authenticated POST request is received at `/api/bookings` with any required field (`car`, `startDate`, `endDate`, `totalPrice`) missing or invalid, THEN THE Backend SHALL return an HTTP 400 response with a descriptive error message and SHALL NOT persist any Booking document.
5. WHEN an authenticated GET request is received at `/api/bookings/my`, THE Backend SHALL return an HTTP 200 response with all Booking documents belonging to the authenticated User, with each Booking's `car` field populated with the Car's `make`, `model`, `year`, and `pricePerDay`.
6. THE Backend SHALL define all booking routes under the `/api/bookings` path prefix and protect them with the authentication middleware.
7. IF an unauthenticated request is received at any `/api/bookings` route, THEN THE Backend SHALL return an HTTP 401 response and SHALL NOT modify any data.

---

### Requirement 9: Database Seed Script

**User Story:** As a developer, I want a seed script to populate the database with initial car data, so that the application has sample data available for development and testing.

#### Acceptance Criteria

1. THE Seed_Script SHALL connect to MongoDB using the `MONGO_URI` environment variable.
2. WHEN executed, THE Seed_Script SHALL delete all existing Car documents and insert at least 5 predefined sample Car records, each containing non-empty `make` and `model` strings, a valid positive integer `year`, and a positive number `pricePerDay`.
3. WHEN the Seed_Script completes successfully, THE Seed_Script SHALL log a success message to the console indicating the number of records inserted and terminate the process with exit code 0.
4. IF the Seed_Script encounters an error during connection or data operations, THEN THE Seed_Script SHALL log the error to the console and terminate the process with a non-zero exit code.
5. THE Seed_Script SHALL NOT hardcode any MongoDB connection strings or credentials.
6. IF the `MONGO_URI` environment variable is undefined or empty when the Seed_Script is invoked, THEN THE Seed_Script SHALL log an error message and terminate with a non-zero exit code without attempting a connection.

---

### Requirement 10: Frontend Dependencies and Routing

**User Story:** As a developer, I want the frontend to have routing configured with react-router-dom, so that users can navigate between pages.

#### Acceptance Criteria

1. THE Frontend SHALL list `react-router-dom` version `^6.0.0` or higher as a dependency in `/frontend/package.json`.
2. THE Frontend SHALL define a top-level router in `src/main.jsx` or `src/App.jsx` using `BrowserRouter` from `react-router-dom`.
3. THE Frontend SHALL define at minimum the following routes: `/` (Home/car listing page), `/login` (Login page), `/register` (Registration page), and `/bookings` (User bookings page, protected).
4. WHEN an unauthenticated User (no valid JWT present in `AuthContext`) navigates to a protected route (e.g., `/bookings`), THE Frontend SHALL redirect the User to the `/login` page.

---

### Requirement 11: Authentication Context

**User Story:** As a developer, I want authentication state managed in a React context, so that all components can access and update the current user session.

#### Acceptance Criteria

1. THE Frontend SHALL define an `AuthContext` in `src/context/` that stores the current user object and the JWT token.
2. WHEN a User logs in successfully, THE Frontend SHALL store the JWT token in `localStorage` and update the `AuthContext` state.
3. WHEN a User logs out, THE Frontend SHALL remove the JWT token from `localStorage` and set the `AuthContext` user to `null` and token to `null`.
4. WHEN the Frontend application loads, THE Frontend SHALL check `localStorage` for an existing JWT token; IF the token is present and not expired, THEN THE Frontend SHALL restore the authentication state in `AuthContext`.
5. IF a token found in `localStorage` on app load is expired or invalid, THEN THE Frontend SHALL clear the token from `localStorage` and set the `AuthContext` to the unauthenticated state (user: null, token: null).

---

### Requirement 12: GitHub Repository Setup

**User Story:** As a developer, I want the monorepo pushed to GitHub, so that the codebase is version-controlled and accessible remotely.

#### Acceptance Criteria

1. THE System SHALL be initialized as a Git repository at the monorepo root.
2. THE System SHALL include a `.gitignore` at the repository root that excludes `node_modules/`, `.env` files, build output directories, and OS-generated files; all remaining source files SHALL be committed to the default branch.
3. THE System SHALL be pushed to a remote GitHub repository.
4. THE README.md SHALL include the following sections: (a) a command for cloning the repository, (b) commands for installing dependencies in both workspaces, (c) instructions for setting up environment variables referencing `MONGO_URI`, `PORT`, and `JWT_SECRET`, and (d) commands for starting both the backend and frontend servers.
