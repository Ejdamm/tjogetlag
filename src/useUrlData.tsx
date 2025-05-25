import {useNavigate, useSearchParams} from "react-router-dom";
import {Runner} from "./types";

export const useUrlData = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const runnersRaw = searchParams.get('runners') ?? '';
    const runners = extractRunners(runnersRaw);

    const addRunner = (runnerWithoutId: Omit<Runner, 'id'>) => {
        const runner = { ...runnerWithoutId, id: getNextId(runners) }
        const updatedRunners = [...runners, runner];
        const queryParams = new URLSearchParams({
            runners: joinRunners(updatedRunners),
        });
        navigate(`?${queryParams.toString()}`);
    }

    return { runners, addRunner };
}

const getNextId = (runners: Runner[]): number => {
    if (runners.length === 0) {
        return 1;
    }
    return runners[runners.length - 1].id + 1;
}

const joinRunners = (runners: Runner[]): string => {
    return runners.map(formatRunner).join(';');
}

const formatRunner = (runner: Runner): string => {
    return `${runner.id},${runner.name}`;
}

const extractRunners = (runners: string): Runner[] => {
    if (!runners) {
        return [];
    }
    return runners.split(';').map(extractRunner);
}

const extractRunner = (runner: string): Runner => {
    const parts = runner.split(',');
    return { id: parseInt(parts[0]), name: parts[1] };
}