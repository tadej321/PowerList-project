const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    date: { type: Date, default: Date.now, required: true},
    note: { type: String, required: true},
    // creator: { type: String, ref: 'User', required: true}
});

module.exports = mongoose.model('Note', noteSchema);