import User from "../../../models/User";
import { validationResult } from "express-validator";

export default async function registerUser(req, res) {
  const { name, email, avatar } = req.body;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.create({
      email,
      name,
      avatar,
    });
    res.status(201).json("User succesfully created!");
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "There was an error", err });
  }
}
