import Group from "../../../models/Group.js";

export const updateGroup = async(req, res) => {
  try {
    const title = req.body;
    const groupId = req.params.id;
    const group = await Group.findByPk(groupId)
    if (!group) {
      return res.status(404).json({ error: "Group not found" })
    }

    group.title = title ?? group.title // If the title field is left empty, leave the original title as the group's title.
    await group.save()
    
    return res.status(200).json({ message: "Group details updated successfully!" })

  } catch (error) {
    return res.status(500).json({ error: "Error  Updating group details" })
  }
}
