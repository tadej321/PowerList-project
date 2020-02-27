// Require bcrypt for encrypting passwords.
const bcrypt = require('bcryptjs');

// Require jwt for creating auth tokens.
const jwt = require('jsonwebtoken');
const User = require('../db/models/user.model');

// Create a new user
exports.createUser = (req, res, next) => {
    // encrypt the password from request body
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
               email: req.body.email,
               password: hash
            });
        user.save()
            .then(result => {
                res.status(201).json({
                    message: "User created",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: ""
                });
            });
        });
};

// Login with an existing user
exports.userLogin = (req, res, next) => {
    let fetchedUser;
    // Check for the email in the database.
    User.findOne({ email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed, email not found"
                });
            }
            fetchedUser = user;
            // Compare passwords, if they match return true.
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed, password not found"
                });
            }
            // Assign a token to the logged in user.
            const token = jwt.sign(
                {email: fetchedUser.email, userId: fetchedUser._id},
                process.env.JWT_KEY,
                {expiresIn: "1h"}
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            console.log("OK");
            console.log(err);
            res.status(401).json({
                message: "Invalid authentication credentials"
            });
        });
};
