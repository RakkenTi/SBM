const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Item = require("./models/Item");
require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

(async () => {
	try {
    console.log("Attempting to connect to DB...")
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to DB");
	} catch (error) {
		console.log("DB Connection failed: ", error.message);
	}
})()

app.get("/", (_, res) => {
  res.send("Backend working");
});

app.get("/db-status", (_, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send("Database working");
  } else {
    res.status(500).send("Database not connected");
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
      res.status(400),json({ message: "Error saving item", error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});