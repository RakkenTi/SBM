"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this is to fetch all the users - good for debugging and testing
const express_1 = __importDefault(require("express"));
const User_1 = require("../../models/User");
const router = express_1.default.Router();
router.get('/users', async (_, res) => {
    try {
        const users = await User_1.UserModel.find(); // fetch all users
        res.status(200).json(users); // send to frontend
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get users', error });
    }
});
exports.default = router;
