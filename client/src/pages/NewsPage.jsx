import { useEffect, useState } from 'react';
import CalendarEvents from '../components/CalendarEvents/CalendarEvents';
import { PostList } from '../components/PostList/PostList';
import AddEventModal from '../components/AddEventModal/AddEventModal';
import { fetchEvents } from '../api/events';
import css from './NewsPage.module.css';

export const NewsPage = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then(res => setEvents(res.data))
      .catch(() => setEvents([]));
  }, []);

  const handleEventAdded = updatedEvents => {
    setEvents(updatedEvents);
    setIsEventModalOpen(false);
  };

  const handleEventDeleted = updatedEvents => {
    setEvents(updatedEvents);
  };

  return (
    <div className={css.pageWrapper}>
      <div className={css.calendarSide}>
        <CalendarEvents
          events={events}
          onEventDeleted={handleEventDeleted}
          onAddEventClick={() => setIsEventModalOpen(true)}
        />
      </div>

      <div className={css.contentSide}>
        <PostList />
      </div>

      {isEventModalOpen && (
        <AddEventModal
          onClose={() => setIsEventModalOpen(false)}
          onEventAdded={handleEventAdded}
        />
      )}
    </div>
  );
};