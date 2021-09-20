import connectDB from '../../../../middleware/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    res.status(500).json({ message: 'Sorry, only PUT requests please!' })
  }

  const { userId } = req.body;
  const { id } = req.query;

  const user = await User.findById(userId);
  !user && res.status(404).send('User not found')

  if (userId === id || user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    
    try {
      await User.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json("User has been updated!");
    } catch (error) {
      return res.status(500).json(error);
    }

  } else {
    res.status(403).json('Insufficient permission!')
  }
};

export default connectDB(handler);