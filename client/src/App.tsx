import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PhisingForm from "./components/PhishingForm.tsx";
import Phisings from "./components/Phishings.tsx";
import PrivateLayout from "./layouts/Layout";
import { AuthContext } from "./AuthContext.tsx";
import { AuthContextProps } from "./interfaces/context.interfaces";

const App: React.FC = () => {

  const { isAuthenticated, checkStatus } = useContext<AuthContextProps>(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login authChecker={checkStatus} />
            ) : (
              <Navigate to="/list" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <Signup authChecker={checkStatus} />
            ) : (
              <Navigate to="/list" />
            )
          }
        />
        <Route
          path="/list"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <Phisings />
              </PrivateLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/form"
          element={
            isAuthenticated ? (
              <PrivateLayout>
                <PhisingForm />
              </PrivateLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
