// src/components/EventTooltip/EventTooltip.jsx
import css from './EventTooltip.module.css';
import { deleteEvent, fetchEvents } from '../../api/events';

const EventTooltip = ({ date, events, onEventDeleted }) => {
  const token = localStorage.getItem('token');
  const isLibrarian = Boolean(token);

  const handleDelete = async id => {
    await deleteEvent(id);
    const updated = await fetchEvents();
    onEventDeleted(updated.data);
  };

  return (
    <div className={css.tooltip}>
      <h4>{date.toLocaleDateString()}</h4>
      {events.map(ev => (
        <div key={ev._id} className={css.eventItem}>
          <strong>{ev.title}</strong>
          <p>{ev.description}</p>
          {isLibrarian && (
            <button
              className={css.deleteButton}
              onClick={() => handleDelete(ev._id)}
            >
              🗑️ Видалити
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventTooltip;
