const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema definition
const userSchema = mongoose.Schema({
    name: {type: String, required:true},
    surname: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// Apply plugins to schema
userSchema.plugin(uniqueValidator);

// Export schema
module.exports = mongoose.model('User', userSchema);
