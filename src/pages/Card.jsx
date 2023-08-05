import React from "react";

export default function Card({ time }) {
  if (!time) return null;

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
    <div className="w-64 bg-gray-100 rounded p-4 shadow-md">
      <h3 className="text-3xl font-semibold text-center text-green-500 mb-2">{formatTime(time)}</h3>
      <div className="text-center">
        <p className="text-gray-600 text-lg">Previous Time</p>
      </div>
    </div>
  );
}
