import {useNavigate, useSearchParams} from "react-router-dom";
import {Runner, Team} from "./types";
import {useMemo} from "react";

export const useUrlData = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const runnersRaw = searchParams.get('runners') ?? '';
    const teamsRaw = searchParams.get('teams') ?? '';
    const runners = useMemo(() => extractRunners(runnersRaw), [runnersRaw]);
    const teams = useMemo(() => extractTeams(teamsRaw), [teamsRaw]);

    const getQueryParams = () => new URLSearchParams({
        runners: formatRunners(runners),
        teams: formatTeams(teams)
    });

    const addRunner = (runnerWithoutId: Omit<Runner, 'id'>) => {
        const runner = { ...runnerWithoutId, id: getNextId(runners) }
        runners.push(runner)
        navigate(`?${getQueryParams().toString()}`);
    }

    const updateRunner = (runner: Runner) => {
        const index = runners.findIndex((r) => r.id === runner.id);
        runners[index] = runner;
        navigate(`?${getQueryParams().toString()}`);
    }

    const deleteRunner = (runnerId: number) => {
        const index = runners.findIndex((r) => r.id === runnerId);
        runners.splice(index, 1);
        navigate(`?${getQueryParams().toString()}`);
    }

    const assignRunnerToTeam = (runnerId: number, teamId: number, legName: string) => {
        const team = teams.find((t) => t.id === teamId);
        team.legMapping[legName] = runnerId;
        navigate(`?${getQueryParams().toString()}`);
    }

    const addTeam = () => {
        teams.push({ id: teams.length + 1, legMapping: {} })
        navigate(`?${getQueryParams().toString()}`);
    }

    return { runners, teams, getQueryParams, addRunner, updateRunner, assignRunnerToTeam, deleteRunner, addTeam };
}

const formatTeams = (teams: Team[]): string => {
    return teams.map(formatTeam).join(';');
}

const formatTeam = (team: Team): string => {
    const formattedLegMapping = formatLegs(team.legMapping);
    if (!formattedLegMapping) {
        return `${team.id}`;
    }
    return `${team.id},${formattedLegMapping}`;
}

const formatLegs = (legMapping: Team['legMapping']): string => {
    return Object.entries(legMapping).map(([name, id]) => `${name}:${id}`).join(',');
}

const extractTeams = (teams: string): Team[] => {
    if (!teams) {
        return [];
    }
    return teams.split(';').map(extractTeam);
}

const extractTeam = (team: string): Team => {
    const [id, ...pairs] = team.split(',');
    const legMapping: Team['legMapping'] = {};
    pairs.forEach((pair) => {
        const parts = pair.split(':');
        legMapping[parts[0]] = parseInt(parts[1]);
    })

    return { id: parseInt(id), legMapping };
}

const getNextId = (runners: Runner[]): number => {
    if (runners.length === 0) {
        return 1;
    }
    return runners[runners.length - 1].id + 1;
}

const formatRunners = (runners: Runner[]): string => {
    return runners.map(formatRunner).join(';');
}

const formatRunner = (runner: Runner): string => {
    return `${runner.id},${runner.name},${runner.yearOfBirth},${runner.sex}`;
}

const extractRunners = (runners: string): Runner[] => {
    if (!runners) {
        return [];
    }
    return runners.split(';').map(extractRunner);
}

const extractRunner = (runner: string): Runner => {
    const parts = runner.split(',');
    return { id: parseInt(parts[0]), name: parts[1], yearOfBirth: parseInt(parts[2]), sex: parts[3] as 'M' | 'F' };
}