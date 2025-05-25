import React from 'react';
import {useUrlData} from "./useUrlData";
import {RunnerForm} from "./RunnersForm";
import ListGroup from "react-bootstrap/ListGroup";

export const Runners = () => {
    const { runners } = useUrlData();

    return (
        <>
            <RunnerForm/>
            <h2 className="mt-4 mb-3">Löpare</h2>
            <ListGroup>
                {runners.map((runner) => (
                    <ListGroup.Item key={runner.id}>{`${runner.name}`}</ListGroup.Item>
                ))}
            </ListGroup>
        </>

    );
}
