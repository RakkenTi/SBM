"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = require("../../models/Product");
const router = express_1.default.Router();
router.post('/get_user_product', async (req, res) => {
    try {
        const { userID, productName } = req.body;
        //check if userID or ProductID is missing
        if (!userID || !productName) {
            return res
                .status(400)
                .json({ error: 'Missing userID or productName' });
        }
        //Check if product exists
        const product = await Product_1.ProductModel.findOne({
            productName,
        });
        //If product does not exist return server error
        if (!product) {
            return res
                .status(500)
                .json({ error: 'Missing userID or productName' });
        }
        const productUsers = product.productUsers;
        if (!productUsers.includes(userID)) {
            return res
                .status(403)
                .json({ error: 'UserID is not in this product' });
        }
        //If product does exist return success
        res.status(200).json({ product });
        //catch general server error if try block does not run
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error });
    }
});
module.exports = router;
