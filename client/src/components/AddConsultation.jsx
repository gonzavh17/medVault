import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { addConsultation } from "../api/patientPetitions";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";

function AddConsultation({ patient, patient_id }) {
  const { register, handleSubmit } = useForm();
  const { signin, isLogged } = useAuth();
  const [addConsultState, setAddConsultState] = useState(false)

  const onSubmit = async (data) => {
    const consultationData = {
        date: data.date,
        treatment: data.treatment
    };

    try {
        await addConsultation(patient_id, consultationData);
        setAddConsultState(true); // Establecer addConsultState como true después de agregar la consulta
    } catch (error) {
        console.error("Error al agregar consulta:", error);
    }
};

useEffect(() => {
  if (addConsultState) {
      confirmAlert({
          title: "Consulta agregada exitosamente",
          buttons: [
              {
                  label: "Continuar",
                  onClick: () => window.location.reload()
              },
          ],
      });
  }
}, [addConsultState]);

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center my-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-xl flex justify-center">
            Agregar consulta
          </h2>
        </div>

        <div className="mt-10 ">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center border-b py-3">
              <div className="w-1/3"> {/* Ajusta el tamaño del input de la izquierda */}
                
                <div className="mt-2 ">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    {...register("date")}
                    className="flex px-2 w-full py-1.5 justify-center"
                  />
                </div>
              </div>

              <div className="w-2/3 ml-4"> {/* Ajusta el tamaño del input de la derecha */}
                <div className="mt-2">
                  <textarea
                    id="treatment"
                    name="treatment"
                    type="text"
                    autoComplete="treatment"
                    placeholder="Motivo"
                    required
                    {...register("treatment")}
                    className="p-2 block w-full min-h-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddConsultation;
