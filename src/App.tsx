import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Runners } from './Runners';
import { Team } from './Team';

const router = createBrowserRouter([
    {
        path: "/tjogetlag/",
        element: <Team />,
    },
    {
        path: "/tjogetlag/team",
        element: <Team />,
    },
    {
        path: "/tjogetlag/runners",
        element: <Runners />,
    },
]);

export const App = () => {
  return (
     <RouterProvider router={router} />
  );
}
