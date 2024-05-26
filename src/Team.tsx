import React from 'react';
import { Link } from "react-router-dom";
import './App.css';

export const Team = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Team!
        </p>
        <Link to={`/tjogetlag/runners`}>Go to runners</Link>
      </header>
    </div>
  );
}
