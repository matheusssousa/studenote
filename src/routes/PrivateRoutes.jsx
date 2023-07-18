import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="*" element={<Navigate to="/home" />} />
                <Route exact path="/home" Component={Home} />
            </Routes>
        </BrowserRouter>
    );
}

export default PrivateRoutes;