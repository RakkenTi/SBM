const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    console.log("Database name:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.get("/db-status", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send("Database working");
  } else {
    res.status(500).send("Database not connected");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});