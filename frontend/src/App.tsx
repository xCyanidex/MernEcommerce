import "./App.css";
import { Outlet, Route,Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dasboard from "./Pages/Dasboard";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<SignIn />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dasboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
