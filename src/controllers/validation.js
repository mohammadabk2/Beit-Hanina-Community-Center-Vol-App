const usersValidation = require("../database/validation/users");

module.exports = {
    usersValidation: (req, res) => {
        let obj = {};
        Object.keys(usersValidation).forEach((key) => (obj[key] = usersValidation[key].toString()));
        res.json(obj);
    },
};