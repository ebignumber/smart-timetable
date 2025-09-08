import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timetable: { type: Object, required: true }
});

export default mongoose.model('Timetable', timetableSchema);
