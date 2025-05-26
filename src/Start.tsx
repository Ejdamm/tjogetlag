import React from 'react';
import Button from "react-bootstrap/Button";
import {useUrlData} from "./useUrlData";

export const Start = () => {
    const { addTeam } = useUrlData();

    return (
      <Button variant="success" onClick={() => addTeam()}>Lägg till lag</Button>
  );
}
