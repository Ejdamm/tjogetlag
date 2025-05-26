import React from 'react';
import {
    createBrowserRouter, RouterProvider, Outlet,
} from "react-router-dom";
import { Runners } from './Runners';
import { Team } from './Team';
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

const router = createBrowserRouter([
    {
        element: <RootLayout />, // Use RootLayout as the base
        children: [
            {
                path: "/tjogetlag/",
                element: <Start />,
            },
            {
                path: "/tjogetlag/runners",
                element: <Runners />,
            },
            {
                path: "/tjogetlag/team/:teamId",
                element: <Team />,
            },
        ],
    },
]);

export const App = () => {
  return <RouterProvider router={router} />;
}
