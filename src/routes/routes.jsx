import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "../pages/Login";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Login} path="/" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;