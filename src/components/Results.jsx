import React from "react";
import { Link } from "react-router-dom";

export default function Results() {
  return (
    <>
      <h2>This is a test of the results page</h2>
      <p>This is your workout {newData}</p> {/* generated workout data */}
      <p>This is your time {finalTime}</p>
      {/* Only newData and finalTime needed */}
      <Link to="/Exercises">Back to start</Link>
    </>
  );
}
