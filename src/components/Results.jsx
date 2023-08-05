import React from "react";
import { useNavigate } from "react-router-dom";

export default function Results({ exerciseList, finalTime, setShowResult, setExerciseList }) {
  const handleReset = () => {
    setShowResult(false);
  };

  const nav = useNavigate();

  // Helper function to format the time object into "MM:SS" format
  const formatTime = (timeObject) => {
    if (timeObject && timeObject.minutes !== undefined && timeObject.seconds !== undefined) {
      const minutes = String(timeObject.minutes).padStart(2, "0");
      const seconds = String(timeObject.seconds).padStart(2, "0");
      return `${minutes}:${seconds}`;
    }
    return "00:00";
  };

  return (
    <>
      <h2>
        {/* Use a for loop to iterate over the exerciseList */}
        {exerciseList &&
          exerciseList.length > 0 &&
          exerciseList.map((exercise) => (
            <div key={exercise.id} className="p-2 sm:w-1/2 w-full">
              <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  {exercise.exerciseType}: {exercise.nameOfExercise}
                </span>
              </div>
            </div>
          ))}
      </h2>
      {/* Display the formatted finalTime */}
      <p>Final Time: {formatTime(finalTime)}</p>
      <button onClick={handleReset}>Back to Start</button>
      <button onClick={() => nav("/TotalResults")}>Here is Total Result Button</button>
    </>
  );
}
