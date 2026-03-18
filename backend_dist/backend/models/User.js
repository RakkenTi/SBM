"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    userID: String,
    password: String,
    products: [String],
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
