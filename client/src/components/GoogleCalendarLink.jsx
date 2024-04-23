import React from 'react';

function GoogleCalendarLink() {
  const handleGoToGoogleCalendar = () => {
    // Redirige al usuario al calendario de Google
    window.open('https://calendar.google.com/', '_blank');
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleGoToGoogleCalendar}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ver en Google Calendar
      </button>
    </div>
  );
}

export default GoogleCalendarLink;