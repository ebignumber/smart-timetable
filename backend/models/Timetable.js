// backend/models/Timetable.js
import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true },
  timetableData: { type: Object, default: {} },
  classrooms: { type: Array, default: [] },
  teachers: { type: Array, default: [] },
  subjects: { type: Array, default: [] },
  classes: { type: Array, default: [] },
}, { timestamps: true });

// Optional: index user & name for faster lookups
timetableSchema.index({ user: 1, name: 1 });

const Timetable = mongoose.model("Timetable", timetableSchema);
export default Timetable;
