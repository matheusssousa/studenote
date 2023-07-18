import "react-toastify/dist/ReactToastify.css";
import './index.css';
import { AuthProvider } from "./context/Authcontext";
import Routes from "./routes/routes";

function App() {

  return (
    <>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </>
  );
}

export default App;
