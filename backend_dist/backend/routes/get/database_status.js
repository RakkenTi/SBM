"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const router = express_1.default.Router();
router.get('/db-status', (_, res) => {
    if (mongoose_1.connection.readyState === 1) {
        res.send('Database working');
    }
    else {
        res.status(500).send('Database not connected');
    }
});
exports.default = router;
