import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Немає токена' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // у майбутньому можна додати ролі
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Недійсний токен' });
  }
};
