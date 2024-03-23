import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useAuth } from "../context/AuthContext";
import Greeting from "./Greeting";
import { Image } from "../image";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

function Dashboard() {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex flex-col justify-center items-center relative">
        <div className={isLoading ? "opacity-0" : "opacity-100"}>
          <Greeting />
          <p className="text-base my-1">¿Qué es lo que deseas hacer hoy?</p>
          <Link to="/patientDashboard">
            <li className="text-blue-500 hover:underline cursor-pointer">
              Crear nuevo paciente
            </li>
          </Link>
          <Link to="/testPatient">
            <li className="text-blue-500 hover:underline cursor-pointer">
              Agendar turno
            </li>
          </Link>
          <Link to="/testPatient">
            <li className="text-blue-500 hover:underline cursor-pointer">
              Modificar Perfil
            </li>
          </Link>
          <img
            src={Image.medicImg}
            alt=""
            style={{ maxWidth: "900px", maxHeight: "900px" }}
          />
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
