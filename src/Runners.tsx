import React from 'react';
import { Link } from "react-router-dom";
import './App.css';

export const Runners = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Runners!
        </p>
        <Link to={`/tjogetlag/team`}>Go to team</Link>
      </header>
    </div>
  );
}
