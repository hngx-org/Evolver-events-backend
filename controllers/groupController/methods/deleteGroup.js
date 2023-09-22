import { StatusCodes } from "http-status-codes";
import Group from "../../../models/Group.js";
import tryCatchHelper from "../../../utils/helpers/tryCatch.helpers.js";
import GroupMembership from "../../../models/GroupMembership.js";
import GroupImage from "../../../models/GroupImage.js";
import GroupEvents from "../../../models/GroupEvent.js";

const deleteGroup = tryCatchHelper(async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid group ID" });
  }

  try {
    const group = await Group.findByPk(groupId); // Find the group

    if (!group) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Group not found" });
    }

    const groupTitle = group.title;

    // Delete all group memberships for this group
    const deletedGroupMemberships = await GroupMembership.destroy({
      where: {
        group_id: group.id,
      },
    });

    if (deletedGroupMemberships) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Unable to delete group memberships",
      });
    }

    // Delete all group images for this group
    const deletedGroupImages = await GroupImage.destroy({
      where: {
        group_id: group.id,
      },
    });

    if (deletedGroupImages) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Unable to delete group images",
      });
    }

    // Delete all group events for this group
    const deletedEvents = await GroupEvents.destroy({
      where: {
        group_id: group.id,
      },
    });

    if (deletedEvents) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Unable to delete group events",
      });
    }

    await group.destroy();

    return res.status(StatusCodes.OK).json({
      message: `${groupTitle} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Unable to delete group",
    });
  }
});

export default deleteGroup;
