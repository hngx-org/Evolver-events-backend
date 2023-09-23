import User from "../../../models/User";

export const getUserProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "User Profile",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching user profile" });
  }
};
