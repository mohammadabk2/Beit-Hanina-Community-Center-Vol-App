const ping = (req, res) => {
  res.status(200).send({
    message: "pong",
    status: "success",
  });
};

export default ping;
