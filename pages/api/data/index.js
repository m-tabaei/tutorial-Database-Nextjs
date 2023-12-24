import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
    return;
  }

  if (req.method === "POST") {
    const { name, age, phone, address, email } = req.body;

    if (!name || name.length <= 3) {
      return res.status(422).json({
        status: "failed",
        message: "Name must be more than 3 characters",
      });
    }

    try {
      const user = await User.create({ name, age, phone, address, email });

      return res.status(201).json({
        status: "success",
        message: "Data Created",
        data: user,
      });
    } catch (error) {
      console.error("Error creating data in the database:", error);
      return res.status(500).json({
        status: "failed",
        message: "Error in creating data in the database",
      });
    }
  } else if (req.method === "GET") {
    try {
      const users = await User.find();
      return res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (error) {
      console.error("Error retrieving data from the database:", error);
      return res.status(500).json({
        status: "failed",
        message: "Error in retrieving data from the database",
      });
    }
  }
}
