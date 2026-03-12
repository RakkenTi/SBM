const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    //DASHBOARD VARS
    ProductName: String,
    UserLevel: Map,
    AssignedSprint: Map,
    SprintComplete: Number,
    SprintLeft: Number,
    EstimatedTime: Number, // everytime you add an item, it will change this #
    NumberSprints: Number,
    DaysRemSprint: Number,
    DaysRemProduct: Number,

    //PBL VARS
    PBLItems: Array,
    SBLItems: Array
})

module.exports = mongoose.model('Product', ProductSchema)