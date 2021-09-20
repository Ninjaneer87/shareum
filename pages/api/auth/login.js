import connectDB from '../../../middleware/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(500).json({ message: 'Sorry, only POST requests please!' })
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    !user && res.status(404).send('User not found')

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json('Wrong password');

    const claims = {
      id: user.id,
      email,
      username: user.username
    }
    const expirationTime = 60 * 60 * 24 * 7 // 7 days
    const secret = process.env.SECRET_KEY;
    const options = { expiresIn: expirationTime} 
    const jwt = sign(claims, secret, options)

    res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // https
      sameSite: 'strict',
      maxAge: expirationTime,
      path: '/' // root of our domain
    }))
    res.status(200).json({message: `Hi ${user.username}, welcome back!`, data: claims});
  } catch (error) {
    res.status(500).json(error);
  }
}

export default connectDB(handler);
