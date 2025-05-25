import React from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import {useUrlData} from "./useUrlData";

export const NavBar = () => {
    const { getQueryParams } = useUrlData();
    return (
        <Nav variant="tabs">
            <LinkContainer to={{ pathname: '/tjogetlag/', search: getQueryParams().toString() }}>
                <Nav.Link>Start</Nav.Link>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/tjogetlag/runners', search: getQueryParams().toString() }}>
                <Nav.Link>Löpare</Nav.Link>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/tjogetlag/team', search: getQueryParams().toString() }}>
                <Nav.Link>Lag</Nav.Link>
            </LinkContainer>
        </Nav>
    );
}