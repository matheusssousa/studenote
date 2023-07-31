import "react-toastify/dist/ReactToastify.css";
import './index.css';
import { AuthProvider } from "./context/Authcontext";
import Router from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes/MyRoute";

function App() {

  return (
    <BrowserRouter>
        <MyRoutes/>
    </BrowserRouter>
  );
}

export default App;
