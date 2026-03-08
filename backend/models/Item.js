const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },

  itemType: {
    type: String,
    enum: ["Sprint", "Product"]
  },

  itemPriority: {
    type: String,
    enum: ["High", "Medium", "Low"]
  },

  itemRisk: {
    type: String,
    enum: ["High", "Medium", "Low"]
  },

  team: String,

  itemDesc: String,

  inProgress: Boolean
});

module.exports = mongoose.model("Item", ItemSchema);