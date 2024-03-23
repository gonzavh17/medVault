
import React, { useState } from "react";
import SideBar from "./SideBar";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { createPatient } from "../api/patients";
import { postPatient } from "../api/patientPetitions";
import { useNavigate } from 'react-router-dom'
import "react-confirm-alert/src/react-confirm-alert.css"
import { confirmAlert } from "react-confirm-alert";

function PatientDashboard() {
    const { register, handleSubmit } = useForm();
    const [isPost, setIsPost] = useState(false)
    const { signin, isLogged } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            await postPatient(formData);
            setIsPost(true);
            confirmAlert({
                title: `Paciente ${formData.name} ${formData.surname} creado exitosamente`,
                buttons: [
                    {
                        label: "Continuar",
                    },
                ],
            });
        } catch (error) {
            console.log('Error al enviar el formulario:', error);
        }
    };

    if (isPost) {
        navigate("/patientList");
        return null; // Evita que se ejecute el código después de la redirección
    }


    return (
        <div className="flex ">
        <SideBar />

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full max-w-screen-lg mx-auto">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Crear nuevo paciente
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                <p className="font-semibold">Datos persoales:</p>

                <div>
                <div className="mt-2">
                    <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    required
                    {...register("name")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <div className="mt-2">
                    <input
                    id="surname"
                    name="surname"
                    type="text"
                    placeholder="Apellido"
                    required
                    {...register("surname")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="mt-2">
                    <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Dirección"
                    required
                    {...register("address")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mt-2">
                    <input
                    id="occupation"
                    name="occupation"
                    type="text"
                    placeholder="Ocupación"
                    required
                    {...register("occupation")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                
                <div className="mt-2">
                    <select
                    id="marital_status"
                    name="marital_status"
                    required
                    {...register('marital_status')}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                    <option value="">Estado civil</option>
                    <option value="Soltero/a">Soltero/a</option>
                    <option value="Casado/a">Casado/a</option>
                    <option value="Divorciado/a">Divorciado/a</option>
                    <option value="Viudo/a">Viudo/a</option>
                    <option value="Unión libre">Unión libre</option>
                    <option value="Otros">Otros</option>
                    </select>
                </div>

                <div className="mt-2">
                    <input
                    id="livingWith"
                    name="livingWith"
                    type="text"
                    placeholder="Vive solo"
                    required
                    {...register("livingWith")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mt-2">
                <input
                    id="birth_date"
                    name="birth_date"
                    type="date"
                    required
                    {...register("birth_date")}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                </div>

           
                <div className="mt-2">
                    <input
                    id="phone_number"
                    name="phone_number"
                    type="text"
                    placeholder="Numero de telefono"
                    required
                    {...register("phone_number")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mt-2">
                    <input
                    id="frecuently_shoes"
                    name="frecuently_shoes"
                    type="text"
                    placeholder="Calzado frecuente"
                    required
                    {...register("frecuently_shoes")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mt-2">
                    <input
                    id="shoe_size"
                    name="shoe_size"
                    type="text"
                    placeholder="Numero de calzado"
                    required
                    {...register("shoe_size")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                </div>
                
                <div className="border-b"></div>

                <p className="font-semibold">Consultas previas</p>
                
                <div className="mt-2">
                    <select
                    id="previous_consult"
                    name="previous_consult"
                    required
                    {...register('previous_consult')}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                    <option value="">Asistió alguna vez a un podólogo</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                    </select>
                </div>

                <p className="font-semibold">Motivo de consulta:</p>
                
                <div className="mt-2">
                    <textarea
                        id="consult_reason"
                        name="consult_reason"
                        type="text"
                        placeholder="Motivo de consulta"
                        required
                        {...register("consult_reason")}
                        className="block px-2 w-full min-h-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="border-b"></div>

                <p className="font-semibold">Antecedentes Personales:</p>
                
                <div className="mt-2">
                    <select
                    id="diabetes"
                    name="diabetes"
                    required
                    {...register('diabetes')}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                    <option value="">Diabetes</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                    <option value="Desconoce">Desconoce</option>
                    </select>
                </div>

                <div className="mt-2">
                    <input
                    id="diabetes_type"
                    name="diabetes_type"
                    type="text"
                    placeholder="Tipo de diabetes"
                    required
                    {...register("diabetes_type")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mt-2">
                    <select
                    id="allergies"
                    name="allergies"
                    required
                    {...register('allergies')}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                    <option value="">Alergias</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                    <option value="Desconoce">Desconoce</option>
                    </select>
                </div>

                <div className="mt-2">
                    <input
                    id="allergies_type"
                    name="allergies_type"
                    type="text"
                    placeholder="Tipo de alergias"
                    required
                    {...register("allergies_type")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mt-2">
                    <input
                    id="hta"
                    name="hta"
                    type="text"
                    placeholder="HTA"
                    required
                    {...register("hta")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="mt-2">
                    <select
                    id="vascular_anomalies"
                    name="vascular_anomalies"
                    required
                    {...register('vascular_anomalies')}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                    <option value="">Alteraciones Vasculares</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                    <option value="Desconoce">Desconoce</option>
                    <option value="A">A</option>
                    <option value="V">V</option>
                    </select>
                </div>

                <div className="mt-2">
                    <input
                    id="anticoagulated"
                    name="anticoagulated"
                    type="text"
                    placeholder="Anticoagulado"
                    required
                    {...register("anticoagulated")}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="border-b"></div>

                <p className="font-semibold">Hábitos tóxicos</p>

                <div className="mt-2">
                    <textarea
                        id="toxic_habits"
                        name="toxic_habits"
                        type="text"
                        placeholder="Hábitos tóxicos"
                        required
                        {...register("toxic_habits")}
                        className="block px-2 w-full min-h-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="border-b"></div>

                <p className="font-semibold">Antecedentes familiares</p>

                <div className="mt-2">
                    <textarea
                        id="family_background"
                        name="family_background"
                        type="text"
                        placeholder="Antecedentes familiares"
                        required
                        {...register("family_background")}
                        className="block px-2 w-full min-h-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="border-b"></div>

                <p className="font-semibold">Medicación actual:</p>

                <div className="mt-2">
                    <textarea
                        id="actual_medication"
                        name="actual_medication"
                        type="text"
                        placeholder="Antecedentes familiares"
                        required
                        {...register("actual_medication")}
                        className="block px-2 w-full min-h-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Crear paciente
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
  );
}

export default PatientDashboard;
