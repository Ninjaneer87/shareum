import { verify } from "jsonwebtoken";

const authenticate = fn => async (req, res) => {
  const token = req.cookies.auth;
  const secret = process.env.SECRET_KEY;

  try {
    const decoded = verify(token, secret);

    if(decoded) {
      return await fn(req, res);
    }
  } catch (error) {
    res.status(401).json('Not authenticated!')
  }
}

export default authenticate;