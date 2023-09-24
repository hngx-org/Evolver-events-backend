import GroupMembership from "../../../models/GroupMembership";

export default async function getUserGroups(req, res) {
  const { userId } = req.params;

  try {
    const userGroups = await GroupMembership.findAll({
      where: { user_id: userId },
    });

    res.status(200).json(userGroups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
