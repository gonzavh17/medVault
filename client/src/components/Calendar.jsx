// Importa los módulos necesarios
import React, { useState } from 'react';
import SideBar from './SideBar';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';
import axios from 'axios'
import GoogleCalendarLink from './GoogleCalendarLink';

function Calendar() {
    const { register, handleSubmit } = useForm();
    const { currentUser } = useAuth();
    const [startDate, setStartDate] = useState(null); // Estado para la fecha de inicio
    const [endDate, setEndDate] = useState(null); // Estado para la fecha de finalización
    const [isEventCreated, setEventCreated] = useState(false);

    const today = dayjs(); 

    // Manejador de cambio de fecha para la fecha de inicio
    const handleStartDateChange = (date) => {
        setStartDate(date);
        console.log('Fecha de inicio seleccionada:', date);
    };
    
    const handleEndDateChange = (date) => {
        setEndDate(date);
        console.log('Fecha de finalización seleccionada:', date);
    };
    
    const onSubmit = async (data, date) => {

        console.log('Fecha de inicio en onSubmit:', startDate);
    console.log('Fecha de finalización en onSubmit:', endDate);
        // Obtener los datos del formulario
        const eventName = data.summary; 
        const eventDescription = data.description; 
        
        // Verificar si se han seleccionado las fechas de inicio y finalización
        if (!startDate || !endDate) {
            console.error('Debe seleccionar las fechas de inicio y finalización');
            return; // Salir de la función si no se han seleccionado ambas fechas
        }
    
        // Crear el objeto de evento con las fechas seleccionadas
        const event = {
            'summary': eventName,
            'description': eventDescription,
            'start': {
                'dateTime': dayjs(startDate).toISOString(),
            },
            'end': {
                'dateTime': dayjs(endDate).toISOString(),
            }
        };
    
        try {
            // Enviar la solicitud para crear el evento
            const response = await axios.post('http://localhost:8080/create/event', event);
            setEventCreated(true);
            console.log('Evento creado:', response.data);
        } catch (error) {
            console.error('Error al crear el evento:', error);
        }
    };
    

    console.log('Calendar user', currentUser);

    return (
        <div className="flex">
            <div className="">
                <SideBar />
            </div>
            <div className="flex-1 p-4">
                {!currentUser.isGoogleAuthenticated ? (
                    // Mostrar mensaje si el usuario no está autenticado con Google
                    <div className="flex justify-center items-center flex-col h-full">
                        <h1>No se puede ingresar.</h1>
                        <p>
                            Optimiza la gestión de turnos en tu consultorio médico con nuestra aplicación conectada a
                            Google. Conéctate ahora para asegurarte de que tus pacientes reciban la atención que
                            necesitan en el momento adecuado.
                        </p>
                    </div>
                ) : (
                    // Mostrar el formulario si el usuario está autenticado con Google
                    <div className="flex justify-center items-center flex-col h-full">
                        <div className="mb-10 flex justify-center flex-col items-center">
                            <p>Calendario</p>
                            <p>
                                Hola {currentUser.first_name}! Aquí puedes gestionar los turnos de tus pacientes,
                                agendar, eliminar y modificar tu agenda personal, con la ventaja de que puedes acceder
                                a esta desde todos tus dispositivos móviles!
                            </p>
                        </div>

                        <div>
                            {/* Formulario para crear un evento en el calendario */}
                            <form
                                className="space-y-6"
                                action="#"
                                method="POST"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {/* Campos del formulario */}
                                {/* Consulta */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Paciente
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="summary"
                                            name="summary"
                                            type="text"
                                            autoComplete="summary"
                                            required
                                            {...register('summary')}
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Motivo de consulta */}
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block px-2 text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Motivo de consulta
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <textarea
                                            id="description"
                                            name="description"
                                            type="text"
                                            autoComplete="description"
                                            required
                                            {...register('description')}
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* Fecha y hora de inicio */}
                                <DemoItem label="Start Date">
                                    <DesktopDateTimePicker defaultValue={dayjs(today)} onChange={handleStartDateChange} />
                                </DemoItem>

                                {/* Fecha y hora de finalización */}
                                <DemoItem label="End Date">
                                    <DesktopDateTimePicker defaultValue={dayjs(today)} onChange={handleEndDateChange} />
                                </DemoItem>

                                {/* Botón de envío del formulario */}
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Agendar
                                    </button>
                                </div>
                            </form>
                        </div>
                        <GoogleCalendarLink/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Calendar;
