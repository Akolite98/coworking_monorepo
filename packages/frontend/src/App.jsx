import React, { useEffect, useState } from 'react';

function App() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error(err));
  }, []);

  const handleBook = (id) => {
    fetch(`http://localhost:3001/api/bookings/${id}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        if (data.booking) {
          setBookings(bookings.map(b => b.id === id ? data.booking : b));
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="app">
      <h1>Co-Working Space Booking</h1>
      <p>{message}</p>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            {booking.time} - {booking.booked ? 'Booked' : 'Available'}
            {!booking.booked && (
              <button onClick={() => handleBook(booking.id)}>Book</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;