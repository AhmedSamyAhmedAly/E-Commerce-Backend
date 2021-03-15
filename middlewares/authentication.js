const jwt = require('jsonwebtoken');
const User = require('../models/user')


module.exports = (req, res, next) => {
    try {
        const signedData = jwt.verify(req.headers.access_token, 'my-signing-secret');
        const user = User.findById(signedData.id)
        if (user.username == "admin") {
            req.type = "admin"
        } else {
            req.type = "user"
        }
        console.log(signedData);
        req.signedData = signedData;
        next();
    } catch (err) {
        console.log(req.headers);
        console.error(err);
        res.statusCode = 401;
        res.json({ success: false, message: "Authentication failed" });
    }
}