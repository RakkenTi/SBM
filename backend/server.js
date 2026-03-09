const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const getServerStatus = require("./routes/get/server_status")
const getDatabaseStatus = require("./routes/get/database_status")

const postCreateProductRouter = require("./routes/post/create_product")
const postCreateItemRouter = require("./routes/post/create_item");

const startMognooseHealthObserver = require("./mongoose/health_observer");

require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

// Connect to MongoDB
(async () => {
	try {
    console.log("Attempting to connect to DB...")
	startMognooseHealthObserver();
		await mongoose.connect(process.env.MONGO_URI);
	} catch (error) {
		console.log("CRITICAL! Failed to connect to database!", error.message);
		exit(1);
	}
})()

const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(getServerStatus)
app.use(getDatabaseStatus)

app.use("/api", postCreateProductRouter)
app.use("/api", postCreateItemRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});