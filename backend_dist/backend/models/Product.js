"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    productName: String,
    productDescription: String,
    productUsers: [String],
    // Key = user ID, Value = role ("Developer" or "ProductOwner")
    userLevels: {
        type: (Map),
        of: String,
    },
    // Key = user ID, Value = sprint identifier
    assignedSprints: {
        type: (Map),
        of: String,
    },
    sprintComplete: Number,
    sprintLeft: Number,
    estimatedTime: Number, // everytime you add an item, it will change this #
    numberSprints: Number,
    daysRemSprint: Number,
    daysRemProduct: Number,
    //PBL VARS
    PBLItems: Array,
    SBLItems: Array,
});
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
