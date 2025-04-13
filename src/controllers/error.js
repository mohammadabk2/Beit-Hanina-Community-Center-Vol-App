const dbConnection = require("../database/dbconnection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  dbConnection.query(
    `SELECT * FROM users WHERE email=$1;`,
    [req.body.email],
    (error, result) => {
      if (error) {
        res.status(401);
        res.end();
      } else {
        bcrypt.compare(
          req.body.password,
          result.rows[0].password,
          (err, same) => {
            if (same) {
              jwt.sign(
                {
                  id: result.rows[0].id,
                  firstName: result.rows[0].first_name,
                  lastName: result.rows[0].last_name,
                },
                process.env.SECRET,
                (x, token) => {
                  res.send(token);
                }
              );
            } else {
              res.status(401);
              res.end();
            }
          }
        );
      }
    }
  );
};