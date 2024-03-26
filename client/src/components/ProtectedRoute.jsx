import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Outlet, Link } from 'react-router-dom'

function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">No autorizado</h1>
              <p className="mt-6 text-base leading-7 text-gray-600">Por favor inicia sesión</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to='/login'>
                  <p
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Iniciar sesión
                  </p>
                </Link>
              </div>
            </div>
          </div>
        );
    }

    return (
        <Outlet />
    );
}

export default ProtectedRoute