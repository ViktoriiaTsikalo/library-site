// src/components/AddEventModal/AddEventModal.jsx
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import css from './AddEventModal.module.css';
import { addEvent, fetchEvents } from '../../api/events';

registerLocale('uk', uk);

const AddEventModal = ({ onClose, onEventAdded }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    eventDate: null,
  });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = date => {
    setForm(prev => ({ ...prev, eventDate: date }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formattedForm = {
      ...form,
      eventDate: form.eventDate?.toLocaleDateString('en-CA'), // YYYY-MM-DD, локально
    };

    await addEvent(formattedForm);
    const updated = await fetchEvents();
    onEventAdded(updated.data);
    onClose();
  };

  return (
    <div className={css.backdrop}>
      <form onSubmit={handleSubmit} className={css.modal}>
        <h3>Додати подію</h3>

        <DatePicker
          selected={form.eventDate}
          onChange={handleDateChange}
          locale="uk"
          dateFormat="dd.MM.yyyy"
          placeholderText="Оберіть дату події"
          className={css.input}
        />

        <input
          name="title"
          placeholder="Заголовок"
          onChange={handleChange}
          value={form.title}
          required
        />

        <textarea
          name="description"
          placeholder="Опис"
          onChange={handleChange}
          value={form.description}
        />

        <div className={css.buttonGroup}>
          <button type="submit">Зберегти</button>
          <button type="button" onClick={onClose}>Скасувати</button>
        </div>
      </form>
    </div>
  );
};

export default AddEventModal;
