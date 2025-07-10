import { useState } from 'react';
import css from './AddLinkModal.module.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const AddLinkModal = ({ category, onClose, onLinkAdded }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [grade, setGrade] = useState('');
  const [author, setAuthor] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      alert('Назва і посилання обовʼязкові');
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/links`,
        { title, url, grade, author, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onLinkAdded();
    } catch {
      alert('Помилка при додаванні посилання');
    }
  };

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <h2>Додати посилання</h2>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            placeholder="Назва *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Посилання (URL) *"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Для якого класу (необов'язково)"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Автор (необов'язково)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <div className={css.buttons}>
            <button type="submit">Зберегти</button>
            <button type="button" onClick={onClose}>Скасувати</button>
          </div>
        </form>
      </div>
    </div>
  );
};
