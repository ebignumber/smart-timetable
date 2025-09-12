import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import teacherRoutes from './routes/teachers.js';
import subjectRoutes from './routes/subjects.js';
import classroomRoutes from './routes/classrooms.js';
import timetableRoutes from './routes/timetables.js'; // New timetable routes
import authRoutes from './routes/auth.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Root route (fix for "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Welcome to Smart Timetable API ✅');
});

// Routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/timetables', timetableRoutes); // Connect timetable routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
