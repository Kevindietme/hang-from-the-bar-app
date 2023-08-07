import React from "react";
import { useNavigate } from "react-router-dom";

export default function Results({ exerciseList, finalTime, setShowResult, setExerciseList }) {
  const handleReset = () => {
    setShowResult(false);
  };

  const nav = useNavigate();

  const formatTime = (timeObject) => {
    if (timeObject && timeObject.minutes !== undefined && timeObject.seconds !== undefined) {
      const minutes = String(timeObject.minutes).padStart(2, "0");
      const seconds = String(timeObject.seconds).padStart(2, "0");
      return `${minutes}:${seconds}`;
    }
    return "00:00";
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-lg w-full px-4 py-8 bg-gray-800">
        <img className="h-auto mx-auto max-w-lg" src="/images/resultsImg.png" alt="Hang Bar App Logo"></img>
        {exerciseList &&
          exerciseList.length > 0 &&
          exerciseList.map((exercise) => (
            <div key={exercise.id} className="p-2 w-full">
              <div className="bg-gray-100 hover:bg-green-600 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  className="text-green-500 w-6 h-6 flex-shrink-0 mr-4"
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
        <p className="mt-4 font-mono text-center text-5xl text-green-500">Final Time: {formatTime(finalTime)}</p>
        <div className="mt-8 flex space-x-4">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 text-white bg-yellow-500 border rounded-lg focus:outline-none hover:bg-yellow-600"
          >
            Back to Start
          </button>
          <button
            onClick={() => nav("/TotalResults")}
            className="flex-1 px-4 py-2 text-white bg-green-500 border rounded-lg focus:outline-none hover:bg-green-600"
          >
            See my workouts
          </button>
        </div>
      </div>
    </div>
  );
}
