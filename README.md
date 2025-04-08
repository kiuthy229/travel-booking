# Travel Booking Application

This is a full-stack travel booking application that allows users to browse tours, make bookings, and manage their accounts. The project is divided into two parts: the **Frontend** and the **Backend**.

---

## Frontend

### Location
`/frontend`

### Description
The frontend is built using modern web technologies to provide a user-friendly interface for browsing tours and managing bookings.

### Features
- Browse available tours
- View tour details
- Make bookings
- Manage user accounts

### Setup Instructions
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`.

---

## Backend

### Location
`/backend`

### Description
The backend is built using Node.js, Express, and MongoDB. It provides RESTful APIs for managing users, tours, and bookings.

### Features
- User authentication and authorization
- CRUD operations for tours
- Booking management
- Admin panel for managing users and bookings

### Setup Instructions
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory and add the following:
   ```
   PORT=8000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. The backend server will run on `http://localhost:8000`.

---

## License
This project is licensed under the MIT License.
