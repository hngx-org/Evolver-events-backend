import express from 'express';
import db from '../../../config/db.js';
const router = express.Router();

// Get event details by ID
router.get('/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  const query = 'SELECT * FROM events WHERE id = ?';
  db.query(query, eventId, (err, results) => {
    if (err) {
      console.error('Error retrieving event details: ' + err.message);
      res.status(500).json({ error: 'Error retrieving event details' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Event not found' });
      } else {
        res.status(200).json(results[0]);
      }
    }
  });
});

export default router;

