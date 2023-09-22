import GroupMembership from "../../../models/GroupMembership.js";

const removeUserFromGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    const deletedRows = await GroupMembership.destroy({
      where: {
        group_id: groupId,
        user_id: userId,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "User not found in the group" });
    }

    return res.status(200).json({ message: "User removed from the group" });
  } catch (error) {
    console.error("Error removing user from group:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default removeUserFromGroup;
