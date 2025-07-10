import { login } from '../services/authService.js';

export function handleLogin(req, res) {
  const { username, password } = req.body;
  const token = login(username, password);
  console.log('username:', username, 'password:', password);
  console.log('token:', token);

  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Невірний логін або пароль' });
  }
}

