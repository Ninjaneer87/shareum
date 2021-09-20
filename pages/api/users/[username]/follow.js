import connectDB from '../../../../middleware/mongodb';
import User from '../../../../models/User';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    res.status(500).json({ message: 'Sorry, only PUT requests please!' })
  }

  const { userId } = req.body;
  const { username } = req.query;

  const userToFollow = await User.findOne({ username });
  !userToFollow && res.status(404).send('User not found');

  const followId = userToFollow.id;

    if (userId !== followId) {
      try {
        const currentUser = await User.findById(userId);

        if (!userToFollow.followers.includes(userId)) {
          await currentUser.updateOne({ $push: { followings: followId } });
          await userToFollow.updateOne({ $push: { followers: userId } });
          res.status(200).json('User has been followed!');
        } else {
          res.status(403).json('You are already following this user!');
        }
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(403).json('You can not follow yourself!');
    }
};

export default connectDB(handler);