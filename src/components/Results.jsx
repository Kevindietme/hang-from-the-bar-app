import { useEffect, useState } from "react";

export default function Results() {

  const [exerciseList, setExerciseList] = useState()
  const [message, setMessage] = useState()
  
  function getResults() {
    setMessage("Getting your results");
    fetch ('https://hang-bar-db.web.app/exercise-results',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setExerciseList();
    })
    .catch((err) => alert(err))
    .finally(() => setMessage(""));
  }

    useEffect(()=> {
      getResults();
    }, []);

  return (
    <>
      <h2>This is a test of the results page</h2>
    
    </>
  );
}
