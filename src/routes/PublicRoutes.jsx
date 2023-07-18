import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="*" element={<Navigate to="/login" />} />
                <Route exact path="/login" Component={Login} />
                <Route exact path="/register" Component={Register} />
            </Routes>
        </BrowserRouter>
    );
}

export default PublicRoutes;