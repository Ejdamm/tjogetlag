import React from 'react';
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import rulesFile from './rules.json';
import {LegMapping, RuleSet, Runner, Team, Leg, Limits} from "./types";
import {useUrlData} from "./useUrlData";
import {useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';

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
                {legs.map((leg) => <LegContainer key={leg.name}
                                                 leg={leg}
                                                 team={team}
                                                 teams={teams}
                                                 legMapping={legMapping}
                                                 runners={runners}
                                                 handleOnSelect={handleOnSelect}/>)}
            </Stack>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className="my-4" variant="danger" onClick={() => handleDeleteTeam(team.id)}>Ta bort lag</Button>
            </div>
        </>
    );
}

interface LegContainerProps {
    team: Team;
    teams: Team[];
    leg: Leg;
    runners: Runner[];
    legMapping: LegMapping;
    handleOnSelect: (event: React.SyntheticEvent<HTMLSelectElement>, leg: string) => void;
}

const LegContainer: React.FC<LegContainerProps> = ({ team, teams, leg, runners, legMapping, handleOnSelect }) => {
    const extraLegs = leg.extra ?? 0;

    const legComponents = [];
    for (let i = 0; i < extraLegs + 1; i++) {
        const legName = getLegName(leg, i);
        const selectedRunnerId = legMapping[legName];
        const selectedRunner = runners.find((r) => r.id === selectedRunnerId);
        const [ageWarning, sexWarning, assignedWarning] = getRunnerWarnings(selectedRunner, leg, teams);
        const isValid = !ageWarning && !sexWarning && !assignedWarning;

        legComponents.push(
            <Stack key={team.id + legName} direction="horizontal" gap={2} className={leg.extra && i > 0 && 'ps-4'}>
                {legName}
                <RunnerWarnings age={ageWarning} sex={sexWarning} assigned={assignedWarning} />
                <Form.Select isValid={selectedRunner && isValid} isInvalid={selectedRunner && !isValid} value={selectedRunner?.id} onChange={(event) => handleOnSelect(event, legName)}>
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

const getRunnerWarnings = (runner, leg, teams) => {
    if (!runner) {
        return [];
    }

    const warningsCounter = { age: 0, sex: 0 };
    const age = getAge(runner.yearOfBirth);

    const assignedLegs = teams.reduce((assignments, team) => {
        return Object.values(team.legMapping).filter(l => l === runner.id).length + assignments;
    }, 0)

    if (runner.name == "Adam") console.log(assignedLegs);

    if (leg.limits?.length > 0 && leg.limits.findIndex((limit) => limit.sex === runner.sex) === -1) {
        warningsCounter.sex += 1;
    }

    leg.limits?.filter((limit) => limit.sex === runner.sex)
        .map((limit)=> {

            if (age >= limit.maxAge && age <= limit.minAge) {
                return warningsCounter.age += 1;
            }
        })

    return [warningsCounter.age > 0, warningsCounter.sex > 0, assignedLegs > 1];
}


interface RunnerWarningsProps {
    age: boolean;
    sex: boolean;
    assigned: boolean;
}

const RunnerWarnings: React.FC<RunnerWarningsProps> = ({age, sex, assigned}) => {
    return (
        <>
            { age ? <Badge bg="warning" text="dark">Ålder</Badge> : null }
            { sex ? <Badge bg="warning" text="dark">Kön</Badge> : null }
            { assigned ? <Badge bg="warning" text="dark">Dubblerad</Badge> : null }
        </>
    );
}

const getLegName = (leg: Leg, index: number): string => {
    return `${leg.name}${leg.extra ? 'abcdefghijklmnopqrstuvwxyz'[index] : ''}`
}

const getAge = (yearOfBirth?: number) => {
    return new Date().getFullYear() - (yearOfBirth || 0);
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
            const age = getAge(runner.yearOfBirth);
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
