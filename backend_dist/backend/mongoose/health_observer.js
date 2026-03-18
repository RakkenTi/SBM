"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const startMognooseHealthObserver = () => {
    mongoose_1.default.connection.on('connected', () => {
        console.log('Connected to MongoDB.');
    });
    mongoose_1.default.connection.on('error', (err) => {
        console.error('MongoDB error:', err);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB.');
    });
    console.log('MongoDB Health Observer started');
};
exports.default = startMognooseHealthObserver;
