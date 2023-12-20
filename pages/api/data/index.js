export default function handler(req, res) {
  if (req.method === "POST") {
    const name = req.body.name;
    if (!name || name.length <= 3) {
      res
        .status(422)
        .json({
          statuse: "failed",
          message: "Name must be more than 3 characters",
        });
      return;
    }
    res
      .status(201)
      .json({
        statuse: "success",
        message: "Data Created",
        data: { name: name },
      });
    return;
  }
}
