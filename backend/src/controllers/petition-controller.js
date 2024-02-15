// backend/src/controllers/petition-controller.js
import User from '../models/User.js';

export const getUserImage = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user || !user.image) {
      return res.sendFile('defaultUserImg.jpg', { root: './resources' });
    }
    return res.sendFile(user.image, { root: './uploads' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
