require("dotenv").config();
const express = require("express");
const cors = require("cors");

const Dbconnection = require("./config/db.js");
const route = require("./route/routing.js");
const googleRoutes = require("./route/googleRout.js");

const app = express();
const port = 5000;

/* CORS */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
  })
);

/* Middlewares */
app.use(express.json());

/* DB */
Dbconnection();

/* Routes */
app.use("/", route);
app.use("/google", googleRoutes);

/* Start Server */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
