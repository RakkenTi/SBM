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
    console.log("Database name:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB working");
});

// Get all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error("GET /items error:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Save item
app.post("/items", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { name, value } = req.body;

    const newItem = new Item({
      name,
      value
    });

    const savedItem = await newItem.save();
    console.log("Saved item:", savedItem);

    res.status(201).json(savedItem);
  } catch (error) {
    console.error("POST /items error:", error);
    res.status(500).json({ error: "Failed to save item" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});