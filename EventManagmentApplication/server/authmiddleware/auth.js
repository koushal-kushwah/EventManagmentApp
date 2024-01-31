import jwt from 'jsonwebtoken';
const secretKey = 'your-secret-key'; // Use the same secret key as in login
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error: ' + error.message);
    res.status(403).json({ message: 'Invalid token' });
  }
};
