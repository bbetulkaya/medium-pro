import connectDB from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  }
}
