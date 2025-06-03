import React from 'react';
import {
    createHashRouter, RouterProvider, Outlet,
} from "react-router-dom";
import { Runners } from './Runners';
import { TeamBuilder } from './TeamBuilder';
import {NavBar} from "./NavTabs";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Start} from "./Start";
import Container from 'react-bootstrap/Container';

const RootLayout = () => {
    return (
        <>
            <NavBar />
            <Container className="pt-5">
                <Outlet /> {/* This renders the current route's component */}
            </Container>
        </>
    );
};

const router = createHashRouter([
    {
        element: <RootLayout />, // Use RootLayout as the base
        children: [
            {
                path: "/",
                element: <Start />,
            },
            {
                path: "runners",
                element: <Runners />,
            },
            {
                path: "team/:teamId",
                element: <TeamBuilder />,
            },
        ],
    },
]);

export const App = () => {
  return <RouterProvider router={router} />;
}
