import jwt from 'jsonwebtoken';
import { jwtSecret, adminUsername, adminPassword } from '../config/config.js';

export function login(username, password) {
  console.log(username, adminUsername, password, adminPassword);
  if (username === adminUsername && password === adminPassword) {
    return jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '2h' });
  }
  return null;
}
