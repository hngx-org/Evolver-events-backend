import Group from "../../../models/Group";

export default async function getAllGroups(req, res) {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
