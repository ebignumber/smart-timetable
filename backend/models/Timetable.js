// backend/models/Timetable.js
import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  day: { type: String, required: true },
  period: { type: Number, required: true },
  subject: { type: String, required: true },
  teacher: { type: String, required: true },
});

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
