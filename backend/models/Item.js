const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: String,
  type: {type: String, enum: ['Product', 'Sprint'], default: 'Product' },
  priority: {type: String, enum: ['High', 'Medium', 'Low'], defualt: 'Medium'},
  status: {type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do'},
  effort: {type: Number, default: 0},
  risk: {type: String, enum: ['Low', 'Medium', 'High'], default: 'Low'},
  teamLabel: String,
  isLocked: {type: Boolean, default: false},
  // possibly adding more in the future for 'Engineering Tasks' if time permits
});

module.exports = mongoose.model("Item", ItemSchema);