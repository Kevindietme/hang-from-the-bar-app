import { useState } from "react"
import Stopwatch from "./Stopwatch";

export default function Exercises() {
  const [exerciseList, setExerciseList] = useState()
  const [message, setMessage] = useState()
  const [resultPage, setResultPage] = useState(false)
  const [finalTime, setFinalTime] = useState()

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const getExercises = async (type) => {
    setMessage('Loading...')
    setExerciseList()
    const response = await fetch(`https://hang-bar-db.web.app/exercise`)
    // const response = await fetch(`https://hang-bar-db.web.app/exercise${type}`)
    let data = await response.json()
    data = shuffle(data)
    console.log(data)
    // TODO: get rid of all but one of each type
    const newData = [
      data.find(e => e.exerciseType === "Pull"),
      data.find(e => e.exerciseType === "Push"),
      data.find(e => e.exerciseType === "Legs"),
      data.find(e => e.exerciseType === "Core"),
      data.find(e => e.exerciseType === "Cardio"),
    ]
    setExerciseList(newData)
  }

  function addResults() {
    const body = {
      exercises: exerciseList,
      time: finalTime
    }
    fetch('https://hang-bar-db.web.app/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .catch(err => alert(err))
    .finally(setResultPage(!resultPage))
  }


return(
  <>
    {resultPage
    ?<p>hello</p>
    : <main>

      <section className="text-gray-600 body-font">

        <div className="button-container">

          <div className="exercise-list">
            <div className="exerciseList">

              <div className="container px-5 py-24 mx-auto">
                <div className="text-center mb-20">
                  <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Hang From the Bar</h1>
                  <button onClick={getExercises} className="flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">Generate Workout</button>
                </div>
                {!exerciseList
                  ? <p className="message">{message}</p>
                  : (<div className="container flex flex-col items-center justify-center w-full mx-auto">
                    {exerciseList.map(exercise => (
                      <div key={exercise.id} className="p-2 sm:w-1/2 w-full">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                          </svg>
                          <span className="title-font font-medium">{exercise.exerciseType}: {exercise.nameOfExercise}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
              </div>

              <button onClick={addResults} className="flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">Submit</button>
            </div>
          </div>
        </div>
      </section>
      <Stopwatch setFinalTime={setFinalTime} />
    </main>
   }
  </>);
}