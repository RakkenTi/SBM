const Item = require("../../models/Item")
const express = require("express")
const router = express.Router()

router.post("/create_item", async(req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
      res.status(400).json({ message: "Error saving item", error: err.message })
  }
})

module.exports = router