import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TeamCard from "./TeamCard";

function App() {
  const [teams, setTeams] = useState([])
  const URL = "https://neofolks-server.up.railway.app/teams/"

  async function getAll(){
    const pw = prompt("Enter Password")
    const response = await fetch(URL, {mode: 'cors', method: "GET",
    headers: new Headers({'Authorization': `Basic ` + window.btoa(`test:${pw}`)})
  })
    const fetchedTeams = await response.json()
    setTeams(await fetchedTeams)
    console.log(teams)
  }

  return (
    <div className="App bg-black w-screen h-screen text-white flex flex-col items-center overflow-auto py-2">
      <button onClick={getAll} className="p-4 border-2 border-white rounded-lg">Get all teams</button>
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        {teams.map(team => {
          return <TeamCard team={team}/>
        })}
      </div>
    </div>
  );
}

export default App;
