import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Anotacoes from "../pages/Anotacoes";
import Horario from "../pages/Horario";

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route exact path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notas" element={<Anotacoes />} />
            <Route path="/horario" element={<Horario />} />
        </Routes>
    );
}

export default PrivateRoutes;
