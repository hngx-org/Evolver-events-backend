import User from '../../../models/User.js'


export const updateUser = async(req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    await user.save();

    return res.status(200).json({ 
      messae: 'User Updated Successfully!',
      user: user 
    })

  } catch (error) {
    return res.status(500).json({ error: 'Error update user profile'})
  }
}
