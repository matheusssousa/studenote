import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Anotacoes from "../pages/Anotacoes";
import Categorias from "../pages/Categorias";
import Disciplinas from "../pages/Disciplinas";

import Navbar from "../components/Navbar";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";

const MyRoutes = () => {
    const location = useLocation();
    const UserAutheticated = useAuth();

    const contextClass = {
        success: "bg-blue-600",
        error: "bg-red-400",
        info: "bg-gray-600",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
    };

    useEffect(() => {   

    }, [location]);

    if (UserAutheticated.userAuthenticated === true) {
        console.log('AUTENTICADO');
        console.log(UserAutheticated.userAuthenticated);
        return (
            <>
                <ToastContainer
                    toastClassName={({ type }) => contextClass[type || "default"] +
                        " relative flex p-1 min-h-10 rounded-md justify-between cursor-pointer"
                    }
                    bodyClassName={() => "text-sm font-white font-med block p-3 flex font-semibold"}
                    autoClose={3000}
                />
                <Navbar />
                <PrivateRoutes />
                <Footer />
            </>
        )
    } else {
        console.log('NAO AUTENTICADO');
        console.log(UserAutheticated);
        console.log(UserAutheticated.userAuthenticated)
        return (
            <>
                <ToastContainer
                    toastClassName={({ type }) => contextClass[type || "default"] +
                        " relative flex p-1 min-h-10 rounded-md justify-between cursor-pointer"
                    }
                    bodyClassName={() => "text-sm font-white font-med block p-3 flex font-semibold"}
                    autoClose={3000}
                />
                <PublicRoutes />
            </>
        )
    }
}

export default MyRoutes;