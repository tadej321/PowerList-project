const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // extract the token from the header of the request
        const token = req.headers.authorization.split(" ")[1];

        // decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
        next();
    } catch (error) {
        res.status(401).json({message: "Authentication failed"});
    }
};