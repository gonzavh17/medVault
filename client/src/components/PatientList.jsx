import React from "react";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PlusIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid";

function PatientList({
    patientsOnList,
    handleNextPage,
    handlePrevPage,
    currentPage,
    totalPages,
}) {

    const groupPatientsByFirstLetter = (patients) => {
        const groupedPatients = {};
        patients.forEach(patient => {
            const firstLetter = patient.name.charAt(0).toUpperCase();
            if (!groupedPatients[firstLetter]) {
                groupedPatients[firstLetter] = [];
            }
            groupedPatients[firstLetter].push(patient);
        });
        return groupedPatients;
    };

    const groupedPatients = groupPatientsByFirstLetter(patientsOnList);

    console.log("Pacientes agrupados:", groupedPatients);

    const { currentUser } = useAuth();

    console.log("Pacientes actuales:", patientsOnList.length);
    console.log(currentPage);

    return (
        <div className="flex">
            <SideBar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="flex justify-between items-center w-full my-5 max-w-screen-xl">
                    {currentUser ? (
                        <div className="flex justify-between items-center w-full my-5">
                            <p className="text-lg">
                                Lista de pacientes de {currentUser.first_name}
                            </p>
                            <Link to="/patientDashboard">
                                <p className="text-sm hover:underline ml-auto flex flex-row justify-center items-center">
                                    Nuevo paciente 
                                </p>
                            </Link>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>
                <div className="w-full max-w-screen-xl">
                    {Object.keys(groupedPatients).map(letter => (
                        <div key={letter} className="mb-4 ">
                            <h2 className="text-xl font-bold">{letter}</h2>
                            <ul role="list" className=" divide-gray-100 ">
                                {groupedPatients[letter].map(patient => (
                                    <li key={patient._id} className="flex justify-between gap-x-6 py-5 border-b">
                                        <div className="flex min-w-0 gap-x-4">
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                                    {patient.name}
                                                </p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                    {patient.surname}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-900">
                                                {patient.phone_number}
                                            </p>
                                            <Link to={`/patient/${patient._id}`}>
                                                <p className="text-sm leading-6 hover:underline">Ver ficha</p>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 1} 
                        className="px-4 py-2  border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50">
                        PREVIOUS
                    </button>
                    <span className="text-gray-700">{currentPage} / {totalPages}</span>
                    <button 
                        className="flex items-center px-4 py-2  border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                        onClick={handleNextPage} 
                        disabled={currentPage === totalPages}>
                        NEXT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PatientList;


