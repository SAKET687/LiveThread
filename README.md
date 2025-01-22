# LiveThread: Real-Time Comments System

LiveThread is a real-time comment system built using Next.js for the front-end and Node.js for the back-end. It allows users to authenticate with a username, post comments and view them in real-time using Socket.IO. The comments are stored in a MySQL database.

## Technologies Used

### Front-End:
- **Next.js**: React framework for server-side rendering and static site generation.
- **Material UI (MUI)**: React UI framework for beautiful and responsive design.
- **Axios**: For making HTTP requests to the back-end API.
- **Socket.IO Client**: To receive real-time updates when a new comment is posted.

### Back-End:
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building the REST API.
- **Socket.IO**: Real-time communication to broadcast new comments to all connected clients.
- **MySQL**: Relational database to store user comments.
- **Nodemon**: Utility to automatically restart the server during development.

## Database Setup (MySQL)

Set up the MySQL database and create the `comments` table using the following query:

```sql
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  comment TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Ensure the database is running and the necessary configurations are done in the `dbconfig.js` file in the **backend** folder. You'll need to update the following fields:
- `host`: Set this to your database host (e.g., `localhost` or a remote server).
- `user`: Your MySQL username.
- `password`: Your MySQL password.
- `database`: Your MySQL database name (e.g., `comments`).

Example:

```javascript
const db = mysql.createConnection({
  host: "localhost",     // Replace with your database host
  user: "root",          // Your MySQL username
  password: "password",  // Your MySQL password
  database: "comments",  // Your MySQL database name
});
```

## Installation Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/SAKET687/LiveThread.git
   cd LiveThread
   ```

2. **To navigate and run the front-end**:
   - Go to the **frontend** directory:

     ```bash
     cd frontend
     ```

   - Install the required packages:

     ```bash
     npm install
     ```

   - To run the front-end development server:

     ```bash
     npm run dev
     ```

3. **To navigate and run the back-end**:
   - Go to the **backend** directory:

     ```bash
     cd ../backend
     ```

   - Install the required packages:

     ```bash
     npm install
     ```

   - To run the back-end server:

     ```bash
     npm start
     ```

## API Endpoints

### POST /api/login
- Accepts a **username** and generates a **session ID**.
- **Request body**: `{ "username": "your-username" }`
- **Response**: `{ "session_id": "your-session-id" }`

### GET /api/comments
- Fetches all comments from the MySQL database.
- **Response**: 
  ```json
  [
    {
      "id": 1,
      "username": "user1",
      "comment": "This is a comment.",
      "timestamp": "2025-01-22T14:30:00Z"
    },
    ...
  ]
  ```

### POST /api/comments
- Accepts a comment and the associated **username**, stores it in the MySQL database and broadcasts it to all connected clients in real-time.
- **Request body**: 
  ```json
  {
    "username": "your-username",
    "comment": "your-comment"
  }
  ```

## Real-Time Comments Feature (Socket.IO)

When a new comment is posted through the back-end, the comment is broadcast to all connected clients in real-time using Socket.IO. No need for page refresh — new comments will automatically appear on all clients.

## Running the Application Locally

1. Make sure both the front-end and back-end servers are running.
2. Open `http://localhost:3000` in your browser to interact with the real-time comment system.
3. The back-end is running at `http://localhost:5000`.

## Assumptions

- Users authenticate using a simple username (no password required for this task).
- Comments include the username, comment content and timestamp.
- The database is MySQL and contains a `comments` table.
- Socket.IO is used to provide real-time updates to the front-end.
