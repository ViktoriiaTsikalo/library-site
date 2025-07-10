
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import css from './CalendarEvents.module.css';

import EventTooltip from '../EventTooltip/EventTooltip';

const CalendarEvents = ({ events, onAddEventClick, onEventDeleted }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const token = localStorage.getItem('token');
  const isLibrarian = Boolean(token);

  const getTileClassName = ({ date, view }) =>
    view === 'month' &&
    events.some(e => new Date(e.eventDate).toDateString() === date.toDateString())
      ? css.eventDate
      : '';

  const handleDayClick = date => {
    const filtered = events.filter(
      e => new Date(e.eventDate).toDateString() === date.toDateString()
    );
    setSelectedDate(filtered.length > 0 ? date : null);
    setSelectedEvents(filtered);
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Календар подій</h1>

      <Calendar
        onClickDay={handleDayClick}
        tileClassName={getTileClassName}
      />

      {selectedDate && selectedEvents.length > 0 && (
        <div className={css.tooltipWrapper}>
          <EventTooltip
            date={selectedDate}
            events={selectedEvents}
            onEventDeleted={onEventDeleted}
          />
        </div>
      )}

      {isLibrarian && (
        <button className={css.addButton} onClick={onAddEventClick}>
          ➕ Додати подію
        </button>
      )}
    </div>
  );
};

export default CalendarEvents;


