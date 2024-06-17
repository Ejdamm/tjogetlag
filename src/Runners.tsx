import React from 'react';
import { Link } from "react-router-dom";
import { TextField } from '@react-ui-org/react-ui';
import './App.css';
import '@react-ui-org/react-ui/dist/react-ui.css';

export const Runners = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Runners!
        </p>
        <Link to={`/tjogetlag/team`}>Go to team</Link>
        <TextField label="Namn" />
      </header>
    </div>
  );
}
