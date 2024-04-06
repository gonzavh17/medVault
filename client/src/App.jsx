import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import PatientContainer from "./container/PatientContainer";
import PatiendDetailContainer from "./container/PatiendDetailContainer";
import PatientDashboard from "./components/PatientDashboard";
import MedicProfile from "./components/MedicProfile";
import ProfilePut from "./components/ProfilePut";
import ProtectedRoute from "./components/ProtectedRoute";
import {gapi} from 'gapi-script'
import { useEffect } from "react";
import 'dotenv'
import GoogleLogin from "./components/GoogleLogin";

function App() {

  console.log(import.meta.env.VITE_ID_CLIENT);
  const clientId = import.meta.env.VITE_ID_CLIENT;


  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/googleLogin" element={<GoogleLogin />}></Route>
                          
            <Route element={<ProtectedRoute/>}>
            
              <Route path="/patientList" element={<PatientContainer />}></Route>
              <Route path="/patient/:patient_id" element={<PatiendDetailContainer/>}></Route>
              <Route path="/patientDashboard" element={<PatientDashboard />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/profile" element={<MedicProfile />}></Route>
              <Route path="/editProfile" element={<ProfilePut/>}></Route>
            </Route>
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
