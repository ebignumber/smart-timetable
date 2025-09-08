import express from 'express';
const router = express.Router();
import Classroom from '../models/Classroom.js';

// Create Classroom
router.post('/', async (req, res) => {
  try {
    const classroom = new Classroom(req.body);
    await classroom.save();
    res.status(201).json(classroom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Classrooms
router.get('/', async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
