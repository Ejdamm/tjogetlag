import React from 'react';
import {useUrlData} from "./useUrlData";
import {RunnerForm} from "./RunnersForm";
import ListGroup from "react-bootstrap/ListGroup";
import {Runner, Team} from "./types";
import Button from "react-bootstrap/Button";
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Stack';
import Col from "react-bootstrap/Col";


export const Runners = () => {
    const {runners, teams, deleteRunner} = useUrlData();
    const [selectedRunner, setSelectedRunner] = React.useState<Runner | null>(null);

    const handleDeleteRunner = (runnerId: number) => {
        if (!window.confirm('Är du säker på att du vill ta bort löparen?')) {
            return;
        }
        deleteRunner(runnerId);
    }

    return (
        <>
            <RunnerForm selectedRunner={selectedRunner} resetSelectedRunner={() => setSelectedRunner(null)}/>
            <h2 className="mt-4 mb-3">Löpare</h2>
            {runners.length === 0 && 'Inga löpare registrerade.'}
            <ListGroup>
                {runners.map((runner) => (
                    <ListGroup.Item key={runner.id} className="justify-content-between">
                        <Row direction="horizontal" className="align-items-center">
                            <Col xs="7">
                                {`${runner.id}. ${runner.name} `}
                                {runner.sex === 'M' ? MaleIcon : FemaleIcon}
                            </Col>
                            <Col xs="1">
                                {`${runner.yearOfBirth}`}
                            </Col>
                            <Col xs="3" className="d-none d-md-block">
                                {`${getTeams(runner.id, teams)}`}
                            </Col>
                            <Col xs="auto" className="ms-auto">
                                <Stack direction="horizontal" gap={2} className="justify-content-end">
                                    <Button variant="warning" className="px-1 py-0"
                                            onClick={() => setSelectedRunner(runner)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path
                                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                        </svg>
                                    </Button>
                                    <Button variant="danger" className="px-1 py-0"
                                            onClick={() => handleDeleteRunner(runner.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-trash" viewBox="0 0 16 16">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </Button>
                                </Stack>
                            </Col>
                        </Row>
                        <Row className="d-md-none">
                            <Col>
                                {`${getTeams(runner.id, teams)}`}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

const FemaleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gender-female"
         viewBox="0 0 16 16">
        <path fillRule="evenodd"
              d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/>
    </svg>
);

const MaleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gender-male"
         viewBox="0 0 16 16">
        <path fillRule="evenodd"
              d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/>
    </svg>
);

const getTeams = (runnerId: number, teams: Team[]): string => {
    return teams.reduce((assignedTeams, team, index) => {
        Object.entries(team.legMapping).forEach(([key, value]) => {
            if (value === runnerId) {
                assignedTeams.push(`Lag ${index + 1} (str ${key})`);
            }
        });
        return assignedTeams;
    }, [] as string[]).join(', ');
};
