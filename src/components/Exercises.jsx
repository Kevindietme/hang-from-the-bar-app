import React, { useEffect, useState } from "react";
import Stopwatch from "./Stopwatch";
import Results from "./Results";
import { useNavigate } from "react-router-dom";


export default function Exercises() {
  const [exerciseList, setExerciseList] = useState()
  const [message, setMessage] = useState()
  const [finalTime, setFinalTime] = useState()
  const [showResult, setShowResult] = useState(false)
  const [showImage, setShowImage] = useState(true); 

  const nav = useNavigate();

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex !== 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = 
      [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  const getExercises = async (type) => {
    setMessage('Generating workout...')
    setExerciseList() 
      const response = await fetch(`https://hang-bar-db.web.app/exercise`)
  
      let data = await response.json()
      data = shuffle(data)
      console.log(data)
  
    const newData = [
      data.find(e => e.exerciseType === "Pull"),
      data.find(e => e.exerciseType === "Push"),
      data.find(e => e.exerciseType === "Legs"),
      data.find(e => e.exerciseType === "Core"),
      data.find(e => e.exerciseType === "Cardio"),
    ]
    setExerciseList(newData)
  }

  function handleFinalTimeChange(time) {
    setFinalTime(time);
  }

  function addResults() {
    const body = {
      exercises: exerciseList,
      time: finalTime
    }
    // fetch('https://hang-bar-db.web.app/exercise-results', {
      fetch('http://127.0.0.1:5002/exercise-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .catch(err => alert(err))
    setShowResult(true);
  }

  useEffect (() => {
    if(!showResult) {
      setExerciseList([])
      setFinalTime()
    }
  }, [showResult]);

  return (
    <main className="min-h-screen bg-gray-800 flex items-center justify-center">
      {showResult ? (
        <Results
          exerciseList={exerciseList}
          finalTime={finalTime}
          setShowResult={setShowResult}
          setExerciseList={setExerciseList}
        />
      ) : (
        <section className="bg-gray-800 w-full h-full py-10">
          <div className="w-10/12 mx-auto h-full">
            <div>
              <div className="text-center mb-10">
                <img className="h-max mx-auto max-w-lg" src="/images/hangBarTwo.png" alt="Hang Bar App Logo Image"></img>
                
                <button
                onClick={() => {
                    setShowImage(false); 
                    getExercises();
                  }}
                  className="flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
                >
                  Generate Workout
                </button>
              </div>

              {showImage && (
                <img
                  src="/images/slothHang.jpg"
                  alt="Hanging Sloth Image"
                  className="w-1/2 mx-auto mb-4 animate-pulse"
                />
              )}

              {!exerciseList ? (
                <p className="message">{message}</p>
              ) : (
                <div className="container flex flex-col items-center justify-center w-full mx-auto">
                  {exerciseList.map((exercise) => (
                    <div key={exercise.id} className="p-2 sm:w-1/2 w-full">
                      <div className="bg-gray-100 rounded flex p-4 h-full items-center hover:bg-green-600 active:bg-green-400 focus:outline-none focus:ring focus:ring-green-900">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4"
                          viewBox="0 0 24 24">
                          </svg>
                          <span className="title-font font-medium">{exercise.exerciseType}: {exercise.nameOfExercise}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
              </div>
              <Stopwatch setFinalTime={handleFinalTimeChange} showResult={showResult} />
              <button onClick={addResults} className="flex mt-6 mb-3 mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">Submit</button>
            </div>
      </section>
      )}
    </main>
  )}