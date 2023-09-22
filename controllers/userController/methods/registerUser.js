import User from "../../../models/User.js";

export const registerUser = async (req, res) => {
    const { name, email } = req.body;
    if (!email || !name) {
        return res.status(401).json({ Error: "Bad Request", Message: "Please provide name and email" });
    }
    const checkIfEmailExist = await User.findOne({ where: { email: email } });
    try {
        if (checkIfEmailExist) {
            return res.status(401).json({ Error: "Bad Request", Message: "User with provided email already exists" });
        }
        let dataToInsert = {
            name,
            email,
        }
        const user = await User.create(dataToInsert);
        res.status(200).json({ Status: "successful", Message: user });
    } catch (error) {
        res.json({ messgae: error });
    }
};
