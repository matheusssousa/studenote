import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Anotacoes from "../pages/Anotacoes";
import Categorias from "../pages/Categorias";
import Disciplinas from "../pages/Disciplinas";
import Account from "../pages/Account";
import Community from "../pages/Community";

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route exact path="*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notas" element={<Anotacoes />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/disciplinas" element={<Disciplinas />} />
            <Route path="/conta" element={<Account />} />
            <Route path="/comunidade" element={<Community />} />
        </Routes>
    );
}

export default PrivateRoutes;
