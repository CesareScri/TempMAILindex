import React from "react";

const TimeDisplay = ({ dateString }) => {
  // Extract values from the given date string
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // months are 0-based in JavaScript
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Get today's date
  const today = new Date();
  const currentYear = today.getUTCFullYear();
  const currentMonth = today.getUTCMonth() + 1;
  const currentDay = today.getUTCDate();

  // Check if the given date is the same as today's date
  const isToday =
    year === currentYear && month === currentMonth && day === currentDay;

  return (
    <p className="time-p">
      {isToday ? (
        <span>
          {hours}:{minutes < 10 ? `0${minutes}` : minutes}
        </span>
      ) : (
        <span>
          {month}/{day}/{year}
        </span>
      )}
    </p>
  );
};

export default TimeDisplay;
