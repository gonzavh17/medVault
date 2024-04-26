import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { addConsultation } from "../api/patientPetitions";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function AddConsultation({ patient, patient_id }) {
  const { register, handleSubmit } = useForm();
  const { signin, isLogged } = useAuth();
  const [addConsultState, setAddConsultState] = useState(false);
  const [date, setDate] = useState(dayjs()); // Inicializar la fecha con el valor actual

  const handleDateChange = (date) => {
    setDate(date);

  };

  const onSubmit = async (data) => {
    const formattedDate = dayjs(date).format('DD-MM-YYYY');
    console.log('Fecha seleccionada:', formattedDate);
    const consultationData = {
      date: date,
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
                <DemoItem>
                  <DatePicker label="Fecha de consulta" value={date} onChange={handleDateChange}/>
                </DemoItem>
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

export default AddConsultation