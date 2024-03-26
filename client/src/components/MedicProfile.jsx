import React from "react";
import { useAuth } from "../context/AuthContext";
import SideBar from "./SideBar";
import { Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from 'react-router-dom'

function MedicProfile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  if (!currentUser) {
    return <Spinner />;
  }

  const handleShowConfirmation = () => {
    confirmAlert({
    title: "Confirmar",
    message: `¿Estas seguro que deseas editar el perfil?`,
    buttons: [
        {
        label: "Sí",
        onClick: () => {
            navigate('/editProfile')
        },
        },
        {
        label: "No",
        onClick: () => {},
        },
    ],
    });
};

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col justify-center items-center flex-grow bg-gray-200 ">
      <div className="max-w-md p-12 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Perfil de {currentUser.first_name} {currentUser.last_name}
        </h2>
        <div className="mb-2">
          <p className="text-gray-700">Email: {currentUser.email}</p>
          <p className="text-gray-700">Ocupación: {currentUser.occupation}</p>
          <p className="text-gray-700">Edad: {currentUser.age}</p>
          <p className="text-gray-700">Género: {currentUser.gender}</p>
        </div>
        <div className="mt-4">
         
          <button onClick={() => handleShowConfirmation()} className="px-4 py-2 hover:underline bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out">
            Editar Perfil
          </button>

        </div>
      </div>
    </div>
    </div>
  );
}

export default MedicProfile;
