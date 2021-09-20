import connectDB from '../../../../middleware/mongodb';
import User from '../../../../models/User';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    res.status(500).json({ message: 'Sorry, only PUT requests please!' })
  }

  const { userId } = req.body;
  const { username } = req.query;

  const userToUnfollow = await User.findOne({ username });
  !userToUnfollow && res.status(404).send('User not found');

  const unfollowId = userToUnfollow.id;

    if (userId !== unfollowId) {
      try {
        const currentUser = await User.findById(userId);

        if (userToUnfollow.followers.includes(userId)) {
          await currentUser.updateOne({ $pull: { followings: unfollowId } });
          await userToUnfollow.updateOne({ $pull: { followers: userId } });
          res.status(200).json('User has been unfollowed!');
        } else {
          res.status(403).json('You are not following this user!');
        }
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(403).json('You can not unfollow yourself!');
    }
};

export default connectDB(handler);