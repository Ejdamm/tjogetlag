import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const NavBar = () => {
    return (
        <Nav variant="tabs">
            <LinkContainer to="/tjogetlag/">
                <Nav.Link>Start</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/tjogetlag/runners">
                <Nav.Link>Löpare</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/tjogetlag/team">
                <Nav.Link>Lag</Nav.Link>
            </LinkContainer>
        </Nav>
    );
}