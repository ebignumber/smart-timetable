// backend/models/Subject.js
import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true } // duration in hours per week
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
