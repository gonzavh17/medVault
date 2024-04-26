import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { useAuth } from "../context/AuthContext";
import Greeting from "./Greeting";
import { Image } from "../image";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import ResponsiveSideBar from './ResponsiveSideBar'

function Dashboard() {
  const { currentUser, howIsLogged, isAuthenticatedWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      <Spinner/>
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  console.log(isAuthenticatedWithGoogle)

  return (
    <div className="flex items-center">
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
      <Link to="/calendar">
        <li className="text-blue-500 hover:underline cursor-pointer">
          Agendar turno
        </li>
      </Link>
      <Link to="/profile">
        <li className="text-blue-500 hover:underline cursor-pointer">
          Completar perfil
        </li>
      </Link>
      {/* Aplicar estilos responsivos a la imagen */}
      <img
  src={Image.medicImg}
  alt=""
  className="w-full max-w-[90vw] xl:max-w-[900px] mx-auto"// Ancho máximo relativo al ancho de la pantalla
/>


      <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
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
