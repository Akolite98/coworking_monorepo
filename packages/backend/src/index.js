const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

let bookings = [
  { id: 1, time: '9:00 AM - 12:00 PM', booked: false },
  { id: 2, time: '1:00 PM - 4:00 PM', booked: false },
  { id: 3, time: '5:00 PM - 8:00 PM', booked: false }
];

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.post('/api/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === id);
  if (booking && !booking.booked) {
    booking.booked = true;
    res.json({ message: 'Booking successful', booking });
  } else {
    res.status(400).json({ message: 'Booking failed' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});