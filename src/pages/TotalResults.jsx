import React, { useEffect, useState } from "react";
import ExerciseCard from "./Card";
import { useNavigate } from "react-router-dom";

export default function TotalResults() {
  const [previousResults, setPreviousResults] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const nav = useNavigate();

  const getPreviousResults = async () => {
    try {
      const response = await fetch("https://hang-bar-db.web.app/exercise-results?_sort=date&_order=desc");
      const data = await response.json();
      const latestResults = data.slice(0, 10);
      setPreviousResults(latestResults);
    } catch (error) {
      console.error("Error retrieving previous results:", error);
    }
  };

  useEffect(() => {
    getPreviousResults();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <section className="bg-gray-800 p-8 w-full">
        <div className="max-w-lg mx-auto">
        <img className="h-auto mx-auto max-w-lg" src="/images/progressImg.png" alt="Hang Bar App Logo"></img>          
            <p className="font-mono text-center text-2xl text-green-500 mb-4">Date: {currentDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          {previousResults.length > 0 ? (
            <div className="container flex flex-col items-center justify-center mx-auto">
            {previousResults.map((data) => (
                <div key={data.id} className="mb-4">
                  <ExerciseCard time={data.time} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white mt-4">No previous results found.</p>
          )}
          <button onClick={() => nav('/')} className="flex mx-auto mt-5 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">Back to Start</button>
        </div>
      </section>
    </div>
  );
}