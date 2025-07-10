import { useState } from 'react';
import axios from 'axios';
import css from './AddNewsForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';

registerLocale('uk', uk);

export const AddNewsForm = ({ onNewsAdded }) => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [eventDate, setEventDate] = useState(new Date());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = async (e) => {
    const files = Array.from(e.target.files);
    const token = localStorage.getItem('token');
    const updated = [...mediaFiles];

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        updated.push({ type: 'image', file });
      } else if (file.type.startsWith('video/')) {
        const formData = new FormData();
        formData.append('video', file);

        try {
          const { data } = await axios.post(
            'http://localhost:3000/api/news/upload-video',
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          updated.push({
            type: 'video',
            file,
            videoUrl: data.videoUrl,
            thumbnailUrl: data.videoThumbnailUrl,
          });
        } catch {
          alert(`Помилка при завантаженні відео: ${file.name}`);
        }
      }
    }

    setMediaFiles(updated);
  };

  const handleRemove = (indexToRemove) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('eventDate', eventDate.toISOString());

    mediaFiles.forEach((item) => {
      if (item.type === 'image') {
        formData.append('images', item.file);
      } else if (item.type === 'video') {
        formData.append('videoUrl', item.videoUrl);
        formData.append('videoThumbnailUrl', item.thumbnailUrl);
      }
    });

    try {
      const res = await axios.post('http://localhost:3000/api/news', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onNewsAdded(res.data);
    } catch {
      alert('Помилка при додаванні новини');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Додати новину</h2>

      <label className={css.label}>Заголовок</label>
      <input
        className={css.input}
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Наприклад: Літній читацький табір"
        required
      />

      <label className={css.label}>Опис</label>
      <textarea
        className={css.input}
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Опишіть суть події"
        required
      />

      <div className={css.fileWrapper}>
        <label className={css.fileLabel}>
          ➕ Додати фото або відео
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            multiple
            className={css.hiddenInput}
          />
        </label>

        {mediaFiles.length > 0 && (
          <ul className={css.fileList}>
            {mediaFiles.map((item, i) => (
              <li key={i} className={css.fileName}>
                {item.type === 'image' && '🖼 '}
                {item.type === 'video' && '🎥 '}
                {item.file.name.length > 30
                  ? item.file.name.slice(0, 30) + '...'
                  : item.file.name}
                <button
                  type="button"
                  className={css.removeBtn}
                  onClick={() => handleRemove(i)}
                  title="Видалити"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={css.row}>
        <label className={css.inlineLabel}>📅 Дата події</label>
        <DatePicker
          selected={eventDate}
          onChange={(date) => setEventDate(date)}
          locale="uk"
          dateFormat="dd.MM.yyyy"
          placeholderText="Оберіть дату"
          className={css.input}
        />
      </div>

      <button className={css.button} type="submit">
        📢 Опублікувати
      </button>
    </form>
  );
};
