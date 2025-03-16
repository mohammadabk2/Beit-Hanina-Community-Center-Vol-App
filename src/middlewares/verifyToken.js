import jwt from "jsonwebtoken";

export default (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET, (error) => {
    if (error) {
      res.status(403).end();
    } else {
      next();
    }
  });
};
