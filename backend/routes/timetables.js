// backend/routes/timetables.js
import express from "express";
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.send("Timetable API working!");
});

export default router;
