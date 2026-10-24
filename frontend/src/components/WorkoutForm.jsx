
import { useState, useContext } from "react";
import axios from "axios";
import { WorkoutContext } from "../context/WorkoutContext";

const API_URL = "http://localhost:5000/api/workouts";

const WorkoutForm = () => {
  const { dispatch } = useContext(WorkoutContext);

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter a workout title.");
      return;
    }

    if (load === "" || !Number.isFinite(Number(load)) || Number(load) < 0) {
      setError("Load must be a non-negative number.");
      return;
    }

    if (reps === "" || !Number.isInteger(Number(reps)) || Number(reps) < 1) {
      setError("Reps must be a positive whole number.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        title: title.trim(),
        load: Number(load),
        reps: Number(reps),
      });

      dispatch({
        type: "CREATE_WORKOUT",
        payload: response.data,
      });

      setTitle("");
      setLoad("");
      setReps("");
    } catch (error) {
      setError(
        error.response?.data?.error || "Unable to add workout."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a Workout</h3>

      <label>Workout Title</label>
      <input
        type="text"
        placeholder="e.g. Bench Press"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Load (kg)</label>
      <input
        type="number"
        min="0"
        step="any"
        placeholder="e.g. 50"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        required
      />

      <label>Reps</label>
      <input
        type="number"
        min="1"
        step="1"
        placeholder="e.g. 10"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Workout"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default WorkoutForm;
