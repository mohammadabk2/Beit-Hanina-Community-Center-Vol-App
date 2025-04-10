const ping = (req, res) => {
  console.log("Executing ping controller");
  res.status(200).send("pong");
};

export default ping;
