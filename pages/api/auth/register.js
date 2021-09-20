import connectDB from '../../../middleware/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(500).json({ message: 'Sorry, only POST requests please!' })
  }
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }

}

export default connectDB(handler);
