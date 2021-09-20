import connectDB from '../../../../middleware/mongodb';
import User from '../../../../models/User';

const handler = async (req, res) => {
  if (req.method !== 'DELETE') {
    res.status(500).json({ message: 'Sorry, only DELETE requests please!' })
  }

  const { userId } = req.body;
  const { id } = req.query;

  const user = await User.findById(userId);
  !user && res.status(404).send('User not found')

  if (userId === id || user.isAdmin) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("User has been deleted!");
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }

  } else {
    res.status(403).json('Insufficient permission!')
  }
};

export default connectDB(handler);