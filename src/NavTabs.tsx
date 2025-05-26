import React from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import {useUrlData} from "./useUrlData";

export const NavBar = () => {
    const { getQueryParams, teams } = useUrlData();
    return (
        <Nav variant="tabs">
            <LinkContainer to={{ pathname: '/tjogetlag/', search: getQueryParams().toString() }}>
                <Nav.Link>Start</Nav.Link>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/tjogetlag/runners', search: getQueryParams().toString() }}>
                <Nav.Link>Löpare</Nav.Link>
            </LinkContainer>
            {teams.map((team, index) => (
                <LinkContainer key={team.id} to={{ pathname: `/tjogetlag/team/${team.id}`, search: getQueryParams().toString() }}>
                    <Nav.Link>{`Lag ${index + 1}`}</Nav.Link>
                </LinkContainer>
            ))}
        </Nav>
    );
}