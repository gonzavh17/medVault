    import React, { useState } from "react";
    import SideBar from "./SideBar";
    import { PaperClipIcon } from "@heroicons/react/20/solid";
    import { deletePatient } from "../api/patients";
    import AddConsultation from "./AddConsultation";
    import { confirmAlert } from "react-confirm-alert";
    import { useNavigate } from "react-router-dom";
    import "react-confirm-alert/src/react-confirm-alert.css";

    function PatientDetailCard({ patient, patient_id }) {
    const [deleted, setDeleted] = useState(false); // Estado para indicar si el paciente ha sido eliminado
    const navigate = useNavigate();

    const handleShowConfirmation = () => {
        confirmAlert({
        title: "Confirmar",
        message: `¿Estas seguro que deseas eliminar a ${patient.data.name} ${patient.data.surname}?`,
        buttons: [
            {
            label: "Sí",
            onClick: () => {
                // Acción a realizar si el usuario hace clic en "Sí"
                handleDelete(patient);
            },
            },
            {
            label: "No",
            onClick: () => {},
            },
        ],
        });
    };

    // Función para manejar la eliminación del paciente
    const handleDelete = (patient) => {
        deletePatient(patient.data._id)
        .then(() => {
            setDeleted(true); // Establecer deleted a true después de eliminar el paciente
            confirmAlert({
            title: "Paciente eliminado correctamente",
            buttons: [
                {
                label: "Continuar",
                },
            ],
            });
        })
        .catch((error) => {
            console.error("Error al eliminar paciente:", error);
        });
    };

    // Redirigir a la lista de pacientes si deleted es true
    if (deleted) {
        navigate("/patientList");
        return null; // Evitar que se renderice el resto del componente después de la redirección
    }

    // Verificar si patient es null o undefined
    if (!patient) {
        return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtiene la información del paciente
    }
    return (
        <div className="flex ">
        <SideBar />
        <div className="p-10 flex flex-col justify-center items-center w-full">
            <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
            <div>
                <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Ficha Podologica de {patient.data.name} {patient.data.surname}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <div>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Nombre Completo:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Domicilio:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Ocupacion:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Fecha de nacimiento:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Estado civil:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Vive solo:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Telefono:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Calzado frecuente:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Numero de calzado:
                        </dt>
                    </div>
                    <div>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.name} {patient.surname}
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.address}
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.occupation}
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {new Date(patient.data.birth_date).toLocaleDateString()}
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.marital_status}
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.livingWith}
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.phone_number}
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.frecuently_shoes}
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.shoe_size}
                        </dd>
                    </div>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Asistio alguna vez a un podologo:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.previous_consult}
                    </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Motivo de consulta
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.consult_reason}
                    </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <div>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Diabetes:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Tipo de Diabetes:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Alergias:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        HTA:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        HBC:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Alteraciones vasculares perifericas:
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        A:
                        </dt>
                    </div>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <dt className="text-sm leading-6 text-gray-900">
                        {patient.data.diabetes}
                        </dt>
                        <dt className="text-sm leading-6 text-gray-900">
                        {patient.data.diabetes_type}
                        </dt>
                        <dt className="text-sm leading-6 text-gray-900">
                        {patient.data.allergies}
                        </dt>
                        <dt className="text-sm leading-6 text-gray-900">
                        {patient.data.hta}
                        </dt>
                        <dt className="text-sm leading-6 text-gray-900">HBC:</dt>
                        <dt className="text-sm leading-6 text-gray-900">
                        {patient.data.vascular_anomalies}
                        </dt>
                        <dt className="text-sm leading-6 text-gray-900">A:</dt>
                    </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Habitos toxicos:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.toxic_habits}
                    </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Antencedentes personales:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.family_background}
                    </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                        Medicacion actual:
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {patient.data.actual_medication}
                    </dd>
                    </div>
                    <div>
                    <p className="text-base font-semibold my-7">Consultas</p>
                    </div>
                    {patient.data.consultations.map((consultation, index) => (
                    <div key={index}>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            {new Date(consultation.date).toLocaleDateString()}
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {consultation.treatment}
                        </dd>
                        </div>
                    </div>
                    ))}
                    
                </dl>
                </div>
            </div>
            <AddConsultation patient={patient} patient_id={patient_id} />
            </div>
            <p
            className="cursor-pointer hover:underline "
            onClick={handleShowConfirmation}
            >
            Eliminar Paciente
            </p>
        </div>
        </div>
    );
    }

    export default PatientDetailCard;
