"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = void 0;
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ['Task', 'UserStory'], default: 'Task' },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
    effort: { type: Number, default: 0 },
    risk: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    teamLabel: String,
    isLocked: { type: Boolean, default: false },
});
exports.ItemModel = (0, mongoose_1.model)('Item', ItemSchema);
