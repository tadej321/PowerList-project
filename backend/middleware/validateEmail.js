
/**
 * Middleware for validating emails.
 * */
module.exports = (req, res, next) => {

    if (validate(req.body.email)) {
        next();
    } else {
        res.status(401).json({message: "Email entered is not valid"});
    }
};


/**
 *
 * @param email
 * @returns {boolean}
 *
 * Test the parameter with the regular expression, if parameter is of email format return true.
 */
function validate(email) {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}
