import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
// action="https://listmonk-production-ef6b.up.railway.app/subscription/form"

function App() {
  const emailRef = useRef();
  const nameRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(
      "https://neofolks-server.up.railway.app/participants/",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name": nameRef.current.value, "email": emailRef.current.value})
        // body: {"name": "new name", "email": "workpatil10@gmail.com"}

      }
    );
    console.log(response)
    console.log(nameRef.current.value)
    console.log(emailRef.current.value)
  }

  async function getAll(){
    const response = await fetch("https://neofolks-server.up.railway.app/participants", {mode: 'cors', method: "GET"})
    const participants = await response.json()
    console.log(participants)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' ref={nameRef}/>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="submit" value="submit" />
      </form>
      {/* <button onClick={getAll}>get all</button> */}
    </div>
  );
}

export default App;
