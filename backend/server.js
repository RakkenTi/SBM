const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Item = require("./models/Item");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Backend + MongoDB working");
});

app.post("/items", async (req, res) => {
  try {
    const { name, value } = req.body;

    const newItem = new Item({
      name,
      value
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to save item" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});