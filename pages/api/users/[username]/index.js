import connectDB from '../../../../middleware/mongodb';
import User from '../../../../models/User';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(500).json({ message: 'Sorry, only GET requests please!' })
  }

  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    !user && res.status(404).json('User not found!');

    delete user._doc.password;
    delete user._doc.updatedAt;
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default connectDB(handler);