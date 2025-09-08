import express from 'express';
const router = express.Router();

// Import Timetable model
import Timetable from '../models/Timetable.js';

// Create a new timetable
router.post('/', async (req, res) => {
  try {
    const timetable = new Timetable(req.body);
    await timetable.save();
    res.status(201).json(timetable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all timetables
router.get('/', async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json(timetables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
