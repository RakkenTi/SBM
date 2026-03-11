const mongoose = require('mongoose');

// This function will be called once in server.js
const applyScrumRules = () => {
    // Pre-save bridge runs every time an item is updated
    mongoose.model('Item').schema.pre('save', function (next) {
        // If the item is already in the DB (not new) and isLocked is true
        if (!this.isNew && this.isLocked) {
            // Check if any fields other than 'isLocked' or 'status' are being changed
            // For now, we block all updates if locked
            const error = new Error('Modification forbidden: This item is locked in an active Sprint.');
            return next(error);
        }
        next();
    });
};

module.exports = applyScrumRules;