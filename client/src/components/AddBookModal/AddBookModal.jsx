import { useState } from 'react';
import css from './AddBookModal.module.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const AddBookModal = ({ onClose, onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Назва книги обовʼязкова');
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/catalog`,
        { title, author, year },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onBookAdded();
    } catch (err) {
      alert('Помилка при додаванні книги');
    }
  };

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <h2>➕ Додати нову книгу</h2>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Назва *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Автор"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Рік"
            value={year}
            onChange={(e) => setYear(e.target.value)}
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
