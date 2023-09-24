import GroupMembership from "../../../models/GroupMembership.js";
import Group from "../../../models/Group.js";
import User from "../../../models/User.js";

export default async function getUserGroups(req, res) {
  const { userId } = req.params;

  try {
    User.findByPk(userId, {
      include: [
        {
          model: Group,
          through: {
            model: GroupMembership,
          },
        },
      ],
    }).then((user) => {
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
