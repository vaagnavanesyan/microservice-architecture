import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';

function App() {
  const [status, setStatus] = useState("fail");
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "/api/health",
      ).then( e=> e.json());

      setStatus(result.status);
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{status}</p>
      </header>
    </div>
  );
}

export default App;
