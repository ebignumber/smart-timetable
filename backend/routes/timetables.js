// backend/routes/timetables.js
import express from "express";
import Timetable from "../models/Timetable.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET /api/timetables -> list summaries for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const list = await Timetable.find({ user: req.user.id })
      .select("_id name createdAt updatedAt")
      .sort({ updatedAt: -1 });
    res.json(list);
  } catch (err) {
    console.error("GET /api/timetables error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/timetables/:id -> full timetable document
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const t = await Timetable.findOne({ _id: req.params.id, user: req.user.id });
    if (!t) return res.status(404).json({ message: "Timetable not found" });
    res.json(t);
  } catch (err) {
    console.error("GET /api/timetables/:id error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/timetables -> create new timetable
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, timetableData, classrooms, teachers, subjects, classes } = req.body;
    if (!name) return res.status(400).json({ message: "Timetable name required" });

    const newT = await Timetable.create({
      user: req.user.id,
      name,
      timetableData: timetableData || {},
      classrooms: classrooms || [],
      teachers: teachers || [],
      subjects: subjects || [],
      classes: classes || []
    });

    res.status(201).json(newT);
  } catch (err) {
    console.error("POST /api/timetables error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/timetables/:id -> update existing timetable
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, timetableData, classrooms, teachers, subjects, classes } = req.body;

    const t = await Timetable.findOne({ _id: req.params.id, user: req.user.id });
    if (!t) return res.status(404).json({ message: "Timetable not found" });

    if (name) t.name = name;
    if (timetableData !== undefined) t.timetableData = timetableData;
    if (classrooms !== undefined) t.classrooms = classrooms;
    if (teachers !== undefined) t.teachers = teachers;
    if (subjects !== undefined) t.subjects = subjects;
    if (classes !== undefined) t.classes = classes;

    await t.save();
    res.json(t);
  } catch (err) {
    console.error("PUT /api/timetables/:id error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/timetables/:id -> delete
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const t = await Timetable.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!t) return res.status(404).json({ message: "Timetable not found" });
    res.json({ message: "Timetable deleted" });
  } catch (err) {
    console.error("DELETE /api/timetables/:id error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
