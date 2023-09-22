import GroupMembership from "../../../models/GroupMembership.js";

async function addUserToGroup(req, res) {
  const { userId, groupId } = req.params;

  try {
    const data = await GroupMembership.create({
      user_id: userId,
      group_id: groupId,
    });

    if (!data) {
      return res.status(404).json({ message: "user or group does not exist." });
    }

    res.status(200).json({
      success: true,
      message: "user has been successfully added to group.",
      data,
    });
  } catch (err) {
    console.error("Error creating user: ", err);
    res.status(500).json({ message: "Internal server error." });
  }
}

export default addUserToGroup;
