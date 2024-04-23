import React from "react";
import Login from "./Login";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {

  const { user, isAuthenticated } = useAuth

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-2 min-h-screen">
        <div className="bg-color-1 p-4 flex flex-col items-center justify-center h-screen">
          <div className="flex justify-center ">
            <p className="text-color-4 text-5xl m-1.5 ">MedVault</p>
          </div>
          <p className="text-color-4  text-xl">
            Gestiona tus citas médicas fácilmente. Conecta médicos y pacientes
            para una atención más eficiente y personalizada.
          </p>
          
        </div>
        <Link to='login'>Login</Link>
        {/* <div className="bg-gray-300 p-4">
          <Login />
        </div> */}
      </div>
    </div>
  );
}

export default Home;
