import React from 'react';
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import rulesFile from './rules.json';
import {Rules} from "./types";
import {useUrlData} from "./useUrlData";
import {useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";

export const Team = () => {
    let { teamId: teamIdParam } = useParams();
    const rules = rulesFile as Rules;
    const legs = rules.legs;
    const { teams, runners, assignRunnerToTeam, deleteTeam } = useUrlData();
    const team = teams.find((t) => t.id === parseInt(teamIdParam));
    const legMapping = team.legMapping;

    const handleOnSelect = (event: React.SyntheticEvent<HTMLSelectElement>, leg: string) => {
        const selectedRunnerId = parseInt(event.currentTarget.value, 10);
        assignRunnerToTeam(selectedRunnerId, team.id, leg);
    }

    const handleDeleteTeam = (teamId: number) => {
        if (!window.confirm('Är du säker på att du vill ta bort laget?')) {
            return;
        }
        deleteTeam(teamId);
    }

    return (
        <>
            <Stack gap={1}>
                {legs.map((leg) => (
                    <Stack key={team.id + leg.name} direction="horizontal" gap={3}>
                        {leg.name}
                        <Form.Select value={legMapping[leg.name]} onChange={(event) => handleOnSelect(event, leg.name)}>
                            <option>Välj löpare</option>
                            {runners.map((runner) => (
                                <option key={runner.id} value={runner.id}>{`${runner.name}`}</option>
                            ))}
                        </Form.Select>
                    </Stack>
                ))}
            </Stack>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className="my-4" variant="danger" onClick={() => handleDeleteTeam(team.id)}>Ta bort lag</Button>
            </div>
        </>
    );
}
