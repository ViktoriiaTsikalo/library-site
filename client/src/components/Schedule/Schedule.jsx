import css from './Schedule.module.css';
import Calendar1 from '../../assets/svg/calendar1.svg?react';
import Calendar2 from '../../assets/svg/calendar2.svg?react';

export const Schedule = () => {
  return (
    <section className={css.thirdSection} id="schedule-link">
      <div className={css.container}>
        <h2 className={css.thirdSectionTitle}>Графік роботи</h2>
        <div className={css.schedule}>
          <ul className={css.scheduleList}>
            {[
              { day: 'ПОНЕДІЛОК', time: '9:00-13:00' },
              { day: 'ВІВТОРОК', time: '9:00-13:00' },
              { day: 'СЕРЕДА', time: '9:00-13:00' },
              { day: 'ЧЕТВЕР', time: '9:00-13:00' },
              { day: "П'ЯТНИЦЯ", time: '9:00-13:00' },
              { day: 'СУБОТА', time: 'Вихідний', isDayOff: true },
              { day: 'НЕДІЛЯ', time: 'Вихідний', isDayOff: true, isSunday: true }
            ].map(({ day, time, isDayOff, isSunday }, index) => (
              <li
                key={day}
                className={`${css.scheduleListDay} ${isSunday ? css.sunday : ''}`}
              >
                {isDayOff ? (
                  <Calendar2 className={css.iconLibrarian} width="40" height="40" />
                ) : (
                  <Calendar1 className={css.iconLibrarian} width="40" height="40" />
                )}
                <h3 className={css.scheduleListItem}>{day}</h3>
                <p className={css.scheduleListText}>{time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
