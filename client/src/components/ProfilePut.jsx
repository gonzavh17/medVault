import React, {useEffect, useState} from 'react'
import SideBar from './SideBar'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import { updateUserRequest } from '../api/auth';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ProfilePut() {
    
  const { register, handleSubmit, setValue } = useForm();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      if (currentUser) {
        setValue('first_name', currentUser.first_name);
        setValue('last_name', currentUser.last_name);
        setValue('email', currentUser.email);
        setValue('age', currentUser.age);
        setValue('occupation', currentUser.occupation);
        setValue('gender', currentUser.gender);
      }
    }

    loadUser();
  }, [currentUser]);

  const onSubmit = async (data) => {
    try {
      const userId = currentUser._id;
      await updateUserRequest(userId, data);
      navigate('/profile');
      confirmAlert({
        title: 'Perfil actualizado',
        message: 'Tu perfil ha sido actualizado correctamente.',
        buttons: [
          {
            label: 'Aceptar',
            onClick: () => window.location.reload(), // Recargar la página después de aceptar
          },
        ],
      });
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  const handleShowConfirmation = (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    confirmAlert({
      title: 'Confirmar',
      message: '¿Estás seguro que deseas editar el perfil?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => handleSubmit(onSubmit)(), // Llama a handleSubmit con onSubmit
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };


  return (
    <div className='flex justify-center'>

        <SideBar/>

        <div >
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Editar perfil
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...register('email')}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  {...register('first_name')}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="last_name"
                  className="block px-2 text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  {...register('last_name')}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Age
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="text"
                  required
                  {...register('age')}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Occupation
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="occupation"
                  name="occupation"
                  type="text"
                  required
                  {...register('occupation')}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
              </div>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  required
                  {...register('gender')}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <button
              onClick={handleShowConfirmation}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          
        </div>
      </div>
    </div>

    </div>
  )
}

export default ProfilePut