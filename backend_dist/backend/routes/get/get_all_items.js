"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Item_1 = require("../../models/Item");
const router = express_1.default.Router();
router.get('/all_items', async (_, res) => {
    try {
        // fetch all items from MongoDB
        const items = await Item_1.ItemModel.find();
        // return them in JSON
        res.status(200).json({ items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch items', error });
    }
});
exports.default = router;
