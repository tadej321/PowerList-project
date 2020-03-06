const mongoose = require('mongoose');

// Schema definition
const taskSchema = mongoose.Schema({
    date: { type: String, required: true },
    description: { type: String},
    completion: { type: Boolean, required: true },
    index: {type: Number, required: true}
    // creator: { type: String, ref: 'User', required: true }
});

// Export schema
module.exports = mongoose.model('Task', taskSchema);
