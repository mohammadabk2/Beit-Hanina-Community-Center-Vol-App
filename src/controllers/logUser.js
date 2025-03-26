//TODO change all of this
const dbConnection = require("../database/dbconnection");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            res.status(401);
            res.end();
        } else {
            dbConnection.query(
                `SELECT id, first_name, last_name, email FROM users WHERE id=$1;`,
                [decoded.id],
                (error, result) => {
                    if (error) {
                        res.status(401);
                        res.end();
                    } else {
                        res.json(result.rows[0]);
                    }
                }
            );
        }
    });
};