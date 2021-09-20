import authenticate from '../../middleware/authenticate';

export default function handler(req, res) {
  res.status(200).json({ message: 'Welcome to homepage' })
}

// export default authenticate(function handler(req, res) {
//   res.status(200).json({ message: 'Welcome to homepage' })
// })
