import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css/Calendar.css';
export const Calender = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="Sample">
      <header className="Calendar-container">
        <h1>Calendar to schedule your TACO TIME</h1>
      </header>
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          calendarType="US"
        />
      </div>
    </div>
  );
};
