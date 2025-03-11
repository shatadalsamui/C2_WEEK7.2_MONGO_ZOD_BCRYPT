# WEEK7.2_MONGO_ZOD_BYCRPT

A Node.js project demonstrating MongoDB integration with Zod for validation and bcrypt for password hashing.

## Features

- MongoDB database connection and operations
- Data validation using Zod schemas
- Password hashing with bcrypt
- Secure user authentication patterns

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with your MongoDB connection string:
```
MONGODB_URI=your_connection_string
```

## Usage

Start the application:
```bash
npm start
```

## Project Structure

- `db.js`: MongoDB connection setup
- `models/`: Data models with Zod validation
- `controllers/`: Business logic
- `routes/`: API endpoints
- `utils/`: Helper functions (including bcrypt utilities)

## Technologies Used

- MongoDB
- Mongoose
- Zod
- bcrypt
- Express.js

## License

MIT
