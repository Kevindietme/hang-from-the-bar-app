import React, {useEffect, useState} from "react"
import Card from "./Card";


export default function TotalResults() {

const [previousResults, setPreviousResults] = useState() 

  const getPreviousResults = async () => { 
    try {
      const response = await fetch("http://127.0.0.1:5002/exercise-results");
      const data = await response.json();
      setPreviousResults(data);
    } catch (error) {
      console.error("Error retrieving previous results:", error);
    }
  };

  useEffect(() => {
      getPreviousResults()
  }, []);

  return(
    <>
  <h2>All Results History</h2>
      {previousResults && previousResults.map((data) => {
        return(
        <Card key={data.id} time={data.time} />

        )
      }) 
    }
    </>

  )
}