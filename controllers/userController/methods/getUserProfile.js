import User from "../../../models/User";

export async function getUserProfile(req, res) {
  const { user_id } = req.body;

  try {
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "There was an error", err });
  }
}
