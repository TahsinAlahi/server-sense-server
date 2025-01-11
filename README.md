# ServeSense Server

The backend for the ServeSense application, providing APIs for service browsing, user reviews, and JWT-based authentication. Built with Express.js and MongoDB, it ensures a robust and scalable backend infrastructure.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Routes](#routes)
- [License](#license)

---

## Features

- **Service Management**: APIs for adding, updating, deleting, and retrieving services.
- **Review Management**: Endpoints to add, view, update, and delete user reviews.
- **JWT Authentication**: Secure and token-based user authentication.
- **Cookie Management**: HttpOnly and Secure cookies for authentication.

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (set up locally or use a cloud database like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TahsinAlahi/server-sense-server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd serve-sense-server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=your-port
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

---

## Scripts

- **Start the server**:

  ```bash
  npm start
  ```

- **Start with Nodemon**:

  ```bash
  npm run server
  ```

---

## Dependencies

- **[express](https://www.npmjs.com/package/express)**: Web framework for Node.js.
- **[cors](https://www.npmjs.com/package/cors)**: Cross-Origin Resource Sharing.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Environment variable management.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: JWT-based authentication.
- **[mongodb](https://www.npmjs.com/package/mongodb)**: MongoDB driver for database integration.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: Middleware to parse cookies.

---

## Dev Dependencies

- **[nodemon](https://www.npmjs.com/package/nodemon)**: Automatically restarts the server during development.
- **[eslint](https://www.npmjs.com/package/eslint)**: JavaScript linting tool.
- **[@types/express](https://www.npmjs.com/package/@types/express)**: TypeScript definitions for Express.

---

## Routes

### **Services API** (`/api/services`)

- `GET /home-services`: Retrieve featured services.
- `POST /new-service`: Add a new service (protected by JWT).
- `GET /all-services`: Retrieve all services.
- `GET /my-services`: Retrieve services created by the logged-in user (protected by JWT).
- `GET /service/:id`: Get details of a specific service.
- `PATCH /service/:id`: Update a specific service (protected by JWT).
- `DELETE /service/:id`: Delete a specific service (protected by JWT).

### **Reviews API** (`/api/reviews`)

- `POST /new-review`: Add a new review (protected by JWT).
- `GET /my-reviews`: Retrieve reviews created by the logged-in user (protected by JWT).
- `PATCH /review/:id`: Update a specific review (protected by JWT).
- `DELETE /review/:id`: Delete a specific review (protected by JWT).

### **JWT API** (`/api/jwt`)

- `POST /login`: Generate a JWT token and set it as an HttpOnly cookie.
- `POST /logout`: Clear the authentication cookie.

---

## License

This project is licensed under the ISC License.

---

## Author

- **Tahsin Alahi**
  - [GitHub](https://github.com/TahsinAlahi)
  - [LinkedIn](https://www.linkedin.com/in/tahsinalahi/)
