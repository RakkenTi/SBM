"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this is just checking if userID exists - for log in
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const User_1 = require("../../models/User");
const router = express_1.default.Router(); // create router for this file
router.post('/login', async (req, res) => {
    try {
        const { userID, password } = req.body; // get userID from front end
        const user = await User_1.UserModel.findOne({ userID }); // search db for userID
        if (!user || !user.password) {
            return res.status(404).json({ message: 'user not found' }); // not found user
        }
        const match = await bcrypt_1.default.compare(password, user.password); // compare password
        if (!match) {
            return res.status(401).json({ message: 'Incorrect password' }); // password doesn't match
        }
        // logged in by this point
        res.cookie('session_id', user._id.toString(), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'lax',
            secure: false,
            path: '/',
        });
        const { firstName, lastName, products } = user; //get user name
        res.status(200).json({ firstName, lastName, userID, products }); // success
    }
    catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
});
exports.default = router;
