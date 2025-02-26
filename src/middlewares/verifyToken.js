const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    jwt.verify(req.headers.token, process.env.SECRET, (error, decoded) => {
        if (error) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    });
};