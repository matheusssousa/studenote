import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/Authcontext";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import { useEffect } from "react";

const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-400",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};


const Routes = () => {
    const location = useLocation();
    useEffect(() => {

    }, [location]);
    const { userAuthenticated } = useAuth();
    if (userAuthenticated)
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
    else
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

export default Routes;