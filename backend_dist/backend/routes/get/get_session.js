"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../../models/User");
const router = express_1.default.Router();
router.get('/session', async (req, res) => {
    try {
        const sessionId = req.cookies.session_id; // Requires 'cookie-parser' middleware
        console.log('Received request to retrieve session data');
        console.log('Session ID:', sessionId);
        if (!sessionId) {
            console.log('Session ID invalid!');
            return res.status(401).json({ loggedIn: false });
        }
        const user = await User_1.UserModel.findById(sessionId);
        if (!user) {
            console.log('No user found in db!');
            return res.status(404).json({ loggedIn: false });
        }
        const { firstName, lastName, userID, products } = user;
        console.log('Retrieved user data.');
        res.status(200).json({
            firstName,
            lastName,
            userID,
            products,
            loggedIn: true,
        });
    }
    catch (error) {
        console.error('Encountered error: ', error);
        res.status(500).json({ message: 'Session check failed' });
    }
});
exports.default = router;
