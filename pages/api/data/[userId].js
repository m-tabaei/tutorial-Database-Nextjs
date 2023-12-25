import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";

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
  const id = req.query.userId;
  if (req.method === "GET") {
    try {
      const userData = await User.findById(id);
      res.status(200).json({ status: "success", data: userData });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "Error on retrieving data in the database",
      });
    }
  } else if (req.method === "PATCH") {
    // Update user info
    try {
      const userData = await User.findById(id);
      // Update the fields you want to change
      if (req.body.name) {
        userData.name = req.body.name;
      }
      if (req.body.age) {
        userData.age = req.body.age;
      }
      if (req.body.address) {
        userData.address = req.body.address;
      }
      if (req.body.phone) {
        userData.phone = req.body.phone;
      }

      await userData.save();
      res.status(200).json({ status: "success", data: userData });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "Error on updating data in the database",
      });
    }
  } else if (req.method === "DELETE") {
    // DELETE user info
    try {
      await User.findOneAndDelete({ _id: id });
      res.status(200).json({ status: "success", message: "Data Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "Error on Delete data in the database",
      });
    }
  }
}
