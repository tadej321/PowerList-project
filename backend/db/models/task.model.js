const mongoose = require('mongoose');

// Schema definition
const taskSchema = mongoose.Schema({
    date: { type: Date, default: Date.now,required: true },
    description: { type: String, required: true },
    completion: { type: Boolean, required: true },
    // creator: { type: String, ref: 'User', required: true }
});

// Export schema
module.exports = mongoose.model('Task', taskSchema);