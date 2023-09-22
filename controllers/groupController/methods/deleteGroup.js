import { StatusCodes } from "http-status-codes";
import Group from "../../../models/Group.js";
import tryCatchHelper from "../../../utils/helpers/tryCatch.helpers.js";

const deleteGroup = tryCatchHelper(async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid group ID" });
  }

  const group = await Group.findByPk(groupId); // Find the group

  if (!group) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Group not found" });
  }

  await group.destroy();  // Delete the group

  return res.status(StatusCodes.NO_CONTENT).json({ message: `${group.title} deleted successfully` });
});

export default deleteGroup;