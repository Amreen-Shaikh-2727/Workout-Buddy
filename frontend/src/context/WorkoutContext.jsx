
import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const WorkoutContext = createContext();

const API_URL = "https://workout-buddy-1v1d.onrender.com/api/workouts";

const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };

    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [],
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(API_URL);

        dispatch({
          type: "SET_WORKOUTS",
          payload: response.data,
        });
      } catch (error) {
        console.error("Unable to fetch workouts:", error.message);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
