import "react-toastify/dist/ReactToastify.css";
import './index.css';
import { AuthProvider } from "./context/Authcontext";
import Routes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
