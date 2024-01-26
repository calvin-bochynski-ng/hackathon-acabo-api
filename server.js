require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 8080;
const SERVER_API_URL = process.env.SERVER_API_URL;
const addressRoutes = require("./routes/addresses");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log("Logging request from middleware.");
  next();
});

app.use("/address", addressRoutes);

app.listen(
  PORT,
  console.log(`Server has been started at ${SERVER_API_URL}:${PORT}`)
);
