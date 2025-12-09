const express = require('express');
const Dbconnection = require('./config/db.js');
const route = require('./route/routing.js');  // your router
const cors = require('cors');
const port = 5000;

const app = express();


// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",              // your frontend URL
  methods: ["POST", "GET", "PUT", "DELETE"],   // allowed HTTP methods
  credentials: true                             // allow cookies/auth headers
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to database
Dbconnection();


// Use router
app.use("/", route);  // all routes from routing.js

// Optional direct test route
app.get("/test", (req, res) => {
  res.send("it is routing testing");
});

// Start server
app.listen(port, () => {
  console.log(`port is running on http://localhost:${port}`);
});