const mongoose = require("mongoose");
const Workout = require("../models/Workout");

// GET all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch workouts." });
  }
};

// CREATE a workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Workout title is required." });
  }

  if (load === undefined || load === "" || !Number.isFinite(Number(load)) || Number(load) < 0) {
    return res.status(400).json({ error: "Load must be a valid non-negative number." });
  }

  if (reps === undefined || reps === "" || !Number.isInteger(Number(reps)) || Number(reps) < 1) {
    return res.status(400).json({ error: "Reps must be a positive whole number." });
  }

  try {
    const workout = await Workout.create({
      title: title.trim(),
      load: Number(load),
      reps: Number(reps),
    });

    res.status(201).json(workout);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Unable to create workout." });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid workout ID." });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found." });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete workout." });
  }
};

module.exports = {
  getWorkouts,
  createWorkout,
  deleteWorkout,
};