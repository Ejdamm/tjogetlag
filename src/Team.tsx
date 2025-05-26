import React from 'react';
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import rulesFile from './rules.json';
import {Rules} from "./types";
import {useUrlData} from "./useUrlData";
import {useParams} from "react-router-dom";

export const Team = () => {
    let { teamId } = useParams();
    const rules = rulesFile as Rules;
    const legs = rules.legs;
    const { teams, runners, assignRunnerToTeam } = useUrlData();
    const team = teams.find((t) => t.id === parseInt(teamId));
    const legMapping = team.legMapping;

    const handleOnSelect = (event: React.SyntheticEvent<HTMLSelectElement>, leg: string) => {
        const selectedRunnerId = parseInt(event.currentTarget.value, 10);
        assignRunnerToTeam(selectedRunnerId, team.id, leg);
    }

    return (
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
    );
}
