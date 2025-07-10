import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import css from './LoginForm.module.css';

export const LoginForm = () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/news');
    } catch {
      alert('Невірний логін або пароль');
    }
  };

  return (
    <div className={css.wrapper}> <form  className={css.form} onSubmit={handleLogin}>
      <h2 className={css.title}>Вхід бібліотекаря</h2>
      <label className={css.label}>Логін</label>
      <input className={css.input} value={username} onChange={e => setUsername(e.target.value)} placeholder="library@example.com" />
      <label className={css.label}>Пароль</label>
      <input className={css.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" />
      <button className={css.button} type="submit">Увійти</button>
    </form></div>
   
  );
}