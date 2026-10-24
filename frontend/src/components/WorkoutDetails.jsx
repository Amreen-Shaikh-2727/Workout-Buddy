
import { useContext } from "react";
import axios from "axios";
import { WorkoutContext } from "../context/WorkoutContext";

const API_URL = "https://workout-buddy-1v1d.onrender.com/api/workouts";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useContext(WorkoutContext);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/${workout._id}`);

      dispatch({
        type: "DELETE_WORKOUT",
        payload: response.data,
      });
    } catch (error) {
      alert(
        error.response?.data?.error || "Unable to delete workout."
      );
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p className="workout-date">
        {new Date(workout.createdAt).toLocaleString()}
      </p>
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default WorkoutDetails;
