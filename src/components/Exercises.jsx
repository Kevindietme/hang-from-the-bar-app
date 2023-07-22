import React, { useState } from "react";

export default function Exercises() {
  const [exerciseList, setExerciseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getExercises = async (workout) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://hang-bar-db.web.app/api/exercises`);
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server.");
      }
      const data = await response.json();
      setExerciseList(data);
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1 className="border bg-red-600">This is an H1 test in app.js</h1>
      <div className="button-container">
        <button onClick={() => getExercises("generate-workout")}>
          Generate Workout
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {exerciseList.length > 0 && (
        <ul>
          {exerciseList.map((exercise) => (
            <li key={exercise.id}>
              Name: {exercise.nameOfExercise}, Type: {exercise.exerciseType}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
