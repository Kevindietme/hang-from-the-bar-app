import { useState } from "react";

export default function Exercises() {
  const [exerciseList, setExerciseList] = useState()
  const [message, setMessage] = useState('This is a test message from exercises component')

  const getExercises = async (workout) => {
    setMessage('Creating workout...')
    setExerciseList()
    const response = await fetch(`https://hang-bar-db.web.app/exercise/${workout}`)
    const data = await response.json()
    setExerciseList(data)
  }

  return (
    <main>
  
  <h1 className='border bg-red-600'>This is an H1 test in app.js</h1>
  
  <div className="button-container">
      <button onClick={() => getExercises('generate workout')}>Generate Workout</button>
  </div>
    
    
    
    
    
    </main>
  );
}

