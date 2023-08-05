import React, { useEffect, useState } from "react";
import ExerciseCard from "./Card";
import { useNavigate } from "react-router-dom";

export default function TotalResults() {
  const [previousResults, setPreviousResults] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const nav = useNavigate();

  const getPreviousResults = async () => {
    try {
      // Fetch all results and sort by the latest date (descending order)
      const response = await fetch("http://127.0.0.1:5002/exercise-results?_sort=date&_order=desc");
      const data = await response.json();
      // Take only the first 10 results (latest 10)
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
    <>
      <section className="bg-cyan-500">
        <div className="w-10/12 mx-auto h-full">
          <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-300 mb-4">Hang From the Bar - All Results History</h1>
          <p className="text-center text-white">Date Stamp: {currentDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          {previousResults.length > 0 ? (
            <div className="container flex flex-col items-center justify-center w-full mx-auto">
              {previousResults.map((data) => (
                <ExerciseCard key={data.id} time={data.time} />
              ))}
            </div>
          ) : (
            <p className="text-center text-white mt-4">No previous results found.</p>
          )}
          <button onClick={() => nav('/')} className="flex mx-auto mt-10 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">Back to Home</button>
        </div>
      </section>
    </>
  );
}
