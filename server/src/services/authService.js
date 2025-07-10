import jwt from 'jsonwebtoken';
import { jwtSecret, adminUsername, adminPassword } from '../config/config.js';

export function login(username, password) {
  if (username === adminUsername && password === adminPassword) {
    console.log(username, adminUsername, password, adminPassword);
    return jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '2h' });
  }
  return null;
}
