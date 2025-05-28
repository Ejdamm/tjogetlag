import React from 'react';
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import rulesFile from './rules.json';
import {LegMapping, RuleSet, Runner, Team, Leg, Limits} from "./types";
import {useUrlData} from "./useUrlData";
import {useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";

export const TeamBuilder = () => {
    let { teamId: teamIdParam } = useParams();
    const rules = rulesFile as RuleSet;
    const legs = rules.legs;
    const { teams, runners, assignRunnerToTeam, deleteTeam } = useUrlData();
    const team = teams.find((t) => t.id === parseInt(teamIdParam));
    const legMapping = team.legMapping;
    const menLimits = rules.limits.find((limit) => limit.sex === 'M');
    const womenLimits = rules.limits.find((limit) => limit.sex === 'F');
    const nrOfRestrictedMenLegs = countRestrictedMenLegs(runners, legs, legMapping, menLimits);
    const nrOfWomenLegs = countWomenLegs(runners, legs, legMapping);

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
            <p className={nrOfRestrictedMenLegs > menLimits.maxCount ? 'text-danger' : 'text-success'}>
                {nrOfRestrictedMenLegs} av {menLimits.maxCount} herrar åldrar {menLimits.minAge} - {menLimits.maxAge}
            </p>
            <p className={nrOfWomenLegs < womenLimits.minCount ? 'text-danger' : 'text-success'}>
                {nrOfWomenLegs} av {womenLimits.minCount} damer
            </p>
            <Stack gap={1}>
                {legs.map((leg) => <LegContainer key={leg.name} leg={leg} team={team} legMapping={legMapping} runners={runners} handleOnSelect={handleOnSelect} />)}
            </Stack>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className="my-4" variant="danger" onClick={() => handleDeleteTeam(team.id)}>Ta bort lag</Button>
            </div>
        </>
    );
}

interface LegContainerProps {
    team: Team;
    leg: Leg;
    runners: Runner[];
    legMapping: LegMapping;
    handleOnSelect: (event: React.SyntheticEvent<HTMLSelectElement>, leg: string) => void;
}

const LegContainer: React.FC<LegContainerProps> = ({ team, leg, runners, legMapping, handleOnSelect }) => {
    const extraLegs = leg.extra ?? 0;

    const legComponents = [];
    for (let i = 0; i < extraLegs + 1; i++) {
        const legName = getLegName(leg, i);
        legComponents.push(
            <Stack key={team.id + legName} direction="horizontal" gap={3} className={leg.extra && i > 0 && 'ps-4'}>
                {legName}
                <Form.Select value={legMapping[legName]} onChange={(event) => handleOnSelect(event, legName)}>
                    <option value={-1}>Välj löpare</option>
                    {runners.map((runner) => (
                        <option key={runner.id} value={runner.id}>{`${runner.name}`}</option>
                    ))}
                </Form.Select>
            </Stack>
        )
    }
    return (
        <>{legComponents}</>
    )
}

const getLegName = (leg: Leg, index: number): string => {
    return `${leg.name}${leg.extra ? 'abcdefghijklmnopqrstuvwxyz'[index] : ''}`
}

const countRestrictedMenLegs = (runners: Runner[], legs: Leg[], legMapping: LegMapping, limit: Limits): number => {
    return legs.reduce((count, leg) => {
        const iterations = leg.extra ? leg.extra + 1 : 1;
        for (let i = 0; i < iterations; i++) {
            const legName = getLegName(leg, i);
            const runnerId = legMapping[legName];
            const runner = runners.find((r) => r.id === runnerId);
            if (!runner) {
                continue; // Skip if no runner is assigned to this leg
            }
            const age = new Date().getFullYear() - (runner.yearOfBirth || 0);
            if (runner.sex === 'M' && age <= limit.maxAge && age >= limit.minAge) {
                return count + 1;
            }
        }
        return count;
    }, 0);
};

const countWomenLegs = (runners: Runner[], legs: Leg[], legMapping: LegMapping): number => {
    return legs.reduce((count, leg) => {
        const iterations = leg.extra ? leg.extra + 1 : 1;
        let isWomanLeg = false;
        for (let i = 0; i < iterations; i++) {
            const legName = getLegName(leg, i);
            const runnerId = legMapping[legName];
            const runner = runners.find((r) => r.id === runnerId);
            if (!runner) {
                continue; // Skip if no runner is assigned to this leg
            }
            if (runner.sex === 'F') {
                isWomanLeg = true;
            } else {
                isWomanLeg = false;
                break;
            }
        }
        if (isWomanLeg) {
            return count + 1;
        }
        return count;
    }, 0);
};
