
import { useContext } from "react";
import { WorkoutContext } from "./context/WorkoutContext";
import WorkoutDetails from "./components/WorkoutDetails";
import WorkoutForm from "./components/WorkoutForm";
import "./App.css";

function App() {
  const { workouts } = useContext(WorkoutContext);

  return (
    <div className="app">
      <header className="navbar">
        <div className="container">
          <h1>Workout Buddy</h1>
        </div>
      </header>

      <main className="home container">
        <div className="workouts">
          <h2>Your Workouts</h2>

          {workouts.length === 0 ? (
            <p>No workouts yet. Add your first workout!</p>
          ) : (
            workouts.map((workout) => (
              <WorkoutDetails
                key={workout._id}
                workout={workout}
              />
            ))
          )}
        </div>

        <WorkoutForm />
      </main>
    </div>
  );
}

export default App;
