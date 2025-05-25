import React from 'react';
import {
    Router,
    Route,
    createBrowserRouter, RouterProvider, Outlet,
} from "react-router-dom";
import { Runners } from './Runners';
import { Team } from './Team';
import {NavBar} from "./NavTabs";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Start} from "./Start";

const RootLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet /> {/* This renders the current route's component */}
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
                path: "/tjogetlag/team",
                element: <Team />,
            },
            {
                path: "/tjogetlag/runners",
                element: <Runners />,
            },
        ],
    },
]);

export const App = () => {
  return <RouterProvider router={router} />;
}
