"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Item_1 = require("../../models/Item");
const router = express_1.default.Router();
router.post('/create_item', async (req, res) => {
    try {
        // get item data from frontend
        const { title, description, type, priority, status, effort, risk, teamLabel, isLocked, } = req.body;
        // create new Item object
        // "||" means that if not defined set default to...
        const item = new Item_1.ItemModel({
            title,
            description: description || '',
            type: type || 'Task',
            priority: priority || 'Medium',
            status: status || 'To Do',
            effort: effort || 0,
            risk: risk || 'Low',
            teamLabel: teamLabel || '',
            isLocked: isLocked || false,
        });
        await item.save();
        res.status(201).json({ message: 'Item created', item });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create item', error });
    }
});
exports.default = router;
