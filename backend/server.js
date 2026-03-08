const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});