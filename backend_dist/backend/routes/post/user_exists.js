"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = require("../../models/User");
//asdasdsa
router.post('/check_user', async (req, res) => {
    try {
        const { userID } = req.body;
        if (!userID) {
            return res.status(400).json(false); // no id then return false
        }
        // search for user in MongoDB
        const userFind = await User_1.UserModel.exists({ userID });
        // return true if id found, false if not
        res.status(200).json(!!userFind);
    }
    catch (error) {
        res.status(500).json(false);
    }
});
exports.default = router;
