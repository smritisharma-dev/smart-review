if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const Dbconnection = require("./config/db.js");
const route = require("./route/routing.js");
const googleRoutes = require("./route/googleRout.js");

const app = express();

/* Allowed Origins */
const allowedOrigins = [
  "http://localhost:5173",
  "https://smart-review-management.netlify.app"
  
];


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  })
);


/* Middlewares */
app.use(express.json());

/* DB */
Dbconnection();

/* Routes */
app.use("/", route);
app.use("/google", googleRoutes);

/* Port */
const port = process.env.PORT || 5000;

/* Start Server */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
