import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TeamCard from "./TeamCard";
import exportFromJSON from 'export-from-json'

function App() {
  const [teams, setTeams] = useState([])
  const [counts, setCounts] = useState({teamCount: 0, participantCount: 0})
  const BASE_URL = "https://neofolks-server.up.railway.app"
  
  useEffect(() => {
    async function getCount() {
      const response = await fetch(`${BASE_URL}/regs`, {mode: 'cors', method: "GET"})
      const data = await response.json()
      console.log(data);
      setCounts({teamCount: data.teamCount, participantCount: data.participantCount})
    }

    getCount()

  }, [])
  

  async function getAll(){
    const pw = prompt("Enter admin password")
    const response = await fetch(`${BASE_URL}/teams`, {mode: 'cors', method: "GET",
    headers: new Headers({'Authorization': `Basic ` + window.btoa(`test:${pw}`)})
  })
    setTeams(await response.json())
  }

  async function exportCSV() {
    const pw = prompt("Enter admin password")
    const response = await fetch(`${BASE_URL}/participants`, {mode: 'cors', method: "GET",
    headers: new Headers({'Authorization': `Basic ` + window.btoa(`test:${pw}`)})
  })
    const data = await response.json()
    const fileName = "Tinkerthon_Participants"
    const exportType = exportFromJSON.types.csv

    console.log(data);
    exportFromJSON({data, fileName, fields:["name", "email", "phone", "teamName"], exportType })
  }

  return (
    <div className="App bg-black w-screen h-screen text-white flex flex-col items-center overflow-auto py-2 gap-4">
      <div className="flex gap-2 flex-wrap justify-center">
        <button onClick={getAll} className="p-4 border-2 border-blue-500 rounded-lg">Get all teams</button>
        <button onClick={exportCSV} className="p-4 border-2 border-blue-500 rounded-lg">Export participants as CSV</button>
      </div>

      <div className="flex flex-col justify-center items-center font-semibold text-lg">
        <h1>Team Count: {counts.teamCount}</h1>
        <h1>Participant Count: {counts.participantCount}</h1>
      </div>
      
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {teams.map(team => {
          return <TeamCard team={team}/>
        })}
      </div>
    </div>
  );
}

export default App;
