const ping = (req, res) => {
  console.log("pong");
  res.status(200).send({
    message: "pong",
    status: "success",
  });
};

export default ping;
