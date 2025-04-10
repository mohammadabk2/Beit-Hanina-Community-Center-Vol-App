import usersValidation from "../database/validation/users";

export default {
    usersValidation: (req, res) => {
        let obj = {};
        Object.keys(usersValidation).forEach((key) => (obj[key] = usersValidation[key].toString()));
        res.json(obj);
    },
};