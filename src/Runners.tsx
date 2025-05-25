import React from 'react';
import {useUrlData} from "./useUrlData";
import {RunnerForm} from "./RunnersForm";
import {ListGroup} from "react-bootstrap";

export const Runners = () => {
    const { runners } = useUrlData();

    return (
        <>
            <ListGroup>
                {runners.map((runner) => (
                    <ListGroup.Item key={runner.id}>{`${runner.id} ${runner.name}`}</ListGroup.Item>
                ))}
            </ListGroup>
            <RunnerForm />
        </>

    );
}
