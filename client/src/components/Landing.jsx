import React from "react";
import Login from "./Login";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Image } from "../image";
import { Footer } from "flowbite-react";
import GoogleLogin from "./GoogleLogin";

function Landing() {
  const { user, isAuthenticated } = useAuth;

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Lado izquierdo */}
  <div className="flex flex-col justify-center items-center m-5">
  <p className="text-blue font-bold text-3xl md:text-5xl mb-4">MedVault</p>
    <p className="text-blue text-lg text-center mb-8">
      Simplifica la gestión de consultas médicas con MedVault: agenda citas,
      registra historiales clínicos todo en el mismo lugar.
    </p>
    <Link
      to="login"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Iniciar sesión
    </Link>
  </div>

  {/* Lado derecho */}
  <div className="flex justify-center items-center flex-col">
    <img src={Image.medicTeamImg} alt="Imagen de ejemplo" className="" />
    <a href="http://www.freepik.com">Designed by stories / Freepik</a>
  </div>
</div>


      <section className="py-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Acerca de</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Descripción */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4">¿Cómo funciona?</h3>
              <p className="text-lg text-gray-700 mb-6">
                MedVault es un gestor de pacientes para médicos que simplifica
                la gestión de citas médicas. La aplicación permite a los médicos
                crear fichas médicas para sus pacientes, agregar consultas y
                días, así como agendar turnos de manera eficiente en Google
                Calendar para asi consultarlo de todos sus dispositivos.
              </p>
              <h3 className="text-2xl font-semibold mb-4">
                Características principales
              </h3>
              <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
                <li>Gestión de fichas médicas</li>
                <li>Registro de consultas y días</li>
                <li>Agenda de turnos sincronizada con Google Calendar</li>
                <li>Personalización y eficiencia en la atención</li>
              </ul>
              <h3 className="text-2xl font-semibold mb-4">Recomendacion</h3>
              <p className="text-lg text-gray-700 mb-6">
                Se recomienda iniciar sesion desde su cuenta personal de google
                asi adquiere la sincronizacion con Google Calendar y aprovecha
                el maximo potencial de MedVault.
              </p>
              <GoogleLogin />
            </div>

            {/* Imagen */}
            <div className="flex justify-center items-center">
              <img
                src="/medvault-example-image.jpg"
                alt="Imagen de ejemplo"
                className="w-full md:w-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
