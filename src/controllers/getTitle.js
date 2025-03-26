const database = require("../database/dbconnection.js");

module.exports = (req, res) => {
  database
    .query("SELECT * FROM blog_posts WHERE user_id=1;")
    .then((result) => {
      res.status(200).send(result.rows[0].text_content);
    })
    .catch((error) => {
      console.error(error); // Log the error
      res.error();
    });
};
