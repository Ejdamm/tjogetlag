import React from 'react';
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import rulesFile from './rules.json';
import {Rules} from "./types";
import {useUrlData} from "./useUrlData";

export const Team = () => {
    const rules = rulesFile as Rules;
    const legs = rules.legs;
    const { teams } = useUrlData();
    const team = teams[0];
    const legMapping = team.legMapping;

    return (
        <Stack gap={2}>
            {legs.map((leg) => (
                <Stack key={leg.name} direction="horizontal" gap={3}>
                    {leg.name}
                    <RunnerSelect leg={leg.name} selected={legMapping[leg.name]} />
                </Stack>
            ))}
        </Stack>
    );
}

interface RunnerSelectProps {
    leg: string;
    selected?: number;
}

export const RunnerSelect: React.FC<RunnerSelectProps> = ({ leg, selected }) => {
    const { runners, assignRunnerToTeam } = useUrlData();

    const handleOnSelect = (event: React.SyntheticEvent<HTMLSelectElement>) => {
        const selectedRunnerId = parseInt(event.currentTarget.value, 10);
        assignRunnerToTeam(selectedRunnerId, 0, leg);
    }
    
    return (
        <Form.Select value={selected} onChange={handleOnSelect}>
            <option>Välj löpare</option>
            {runners.map((runner) => (
                <option key={runner.id} value={runner.id}>{`${runner.name}`}</option>
            ))}
        </Form.Select>
    );
}
