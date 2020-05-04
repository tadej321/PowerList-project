const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/dbConnect');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



const taskRoutes = require('./routes/task.routes');
const userRoutes = require('./routes/user.routes');
const noteRoutes = require('./routes/note.routes');

const app = express();

const url = 'mongodb://localhost/PowerList';

const passportOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
};

db.connect(process.env.DB_URI || url)
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Connection failed");
    });

app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
       'Access-Control-Allow-Methods',
       'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

// passport.use(new JWTStrategy(passportOpts, function (jwtPayload, done) {
//     const expirationDate = new Date(jwtPayload.exp * 1000);
//     if(expirationDate < new Date()) {
//         return done(null, false);
//     }
//     done(null, jwtPayload);
// }));

// passport.serializeUser(function (user, done) {
//     done(null, user._id)
// });

app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);

module.exports = app;
