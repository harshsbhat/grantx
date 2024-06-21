import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });
}
