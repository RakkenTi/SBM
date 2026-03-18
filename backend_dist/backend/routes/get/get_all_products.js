"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Product_1 = require("../../models/Product");
router.get('/all_products', async (_, res) => {
    try {
        // Fetch all products from MongoDB
        const products = await Product_1.ProductModel.find();
        // Send them back in JSON
        res.status(200).json({ products });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
});
exports.default = router;
