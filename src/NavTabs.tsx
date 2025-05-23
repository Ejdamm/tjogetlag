import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const NavBar = () => {
    return (
        <Nav variant="tabs">
            <LinkContainer to="/tjogetlag/">
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/tjogetlag/runners">
                <Nav.Link>Runners</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/tjogetlag/team">
                <Nav.Link>Team</Nav.Link>
            </LinkContainer>
        </Nav>
    );
}