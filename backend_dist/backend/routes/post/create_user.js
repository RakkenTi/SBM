"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../models/User");
const router = express_1.default.Router();
router.post('/create_user', async (req, res) => {
    try {
        // get user data sent from the frontend
        const { firstName, lastName, userID, password } = req.body;
        const existingUser = await User_1.UserModel.findOne({ userID }); //check if userID exists
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'User already exists! Choose a new username' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 8);
        console.log('Received request to create user:', firstName, lastName, userID); // for debugging
        // create a new user object using the schema
        const user = new User_1.UserModel({
            firstName,
            lastName,
            userID,
            password: hashedPassword,
            products: [],
        });
        // save the user to MongoDB
        await user.save();
        res.status(201).json({ message: 'Success' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
});
exports.default = router;
