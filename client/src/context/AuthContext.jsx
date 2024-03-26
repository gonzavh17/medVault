import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, currentRequest } from "../api/auth";
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error ('useAuth must be used within an authProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [tokenExpiration, setTokenExpiration] = useState(null); // Nuevo estado para el tiempo de expiración del token

    console.log(isAuthenticated);

    const getCurrentUser = async () => {
        try {
            const res = await currentRequest();
            const userData = res.data;
            setCurrentUser(userData);
            console.log('CurrentUser', userData); 
            setIsLogged(true);

            // Establecer el tiempo de expiración del token
            const tokenExpiresAt = new Date(userData.expiresAt); // Suponiendo que 'expiresAt' contiene la fecha de expiración del token
            setTokenExpiration(tokenExpiresAt);
        } catch (error) {
            console.log(error);
        }
    };
    
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            const userData = res.data.payload;
            setUser(userData);
            setIsAuthenticated(true);
    
            // Llama a getCurrentUser después de iniciar sesión
            getCurrentUser();
        } catch (error) {
            console.log(error);
        }
    };
    
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            const userData = res.data.payload;
            setUser(userData);
            setIsAuthenticated(true); // Establece isAuthenticated en true después del inicio de sesión
    
            // Llama a getCurrentUser después de iniciar sesión
            getCurrentUser();
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await getCurrentUser();
            } catch (error) {
                console.log('Error al obtener el usuario actual:', error);
            }
        };
    
        fetchCurrentUser();
    }, []);

    // Manejar el tiempo de expiración del token
    useEffect(() => {
        const checkTokenExpiration = () => {
            const now = new Date();
            if (tokenExpiration && now > tokenExpiration) {
                // El token ha expirado, desautenticar al usuario y redirigir a la página de inicio de sesión
                setIsAuthenticated(false);
                setUser(null);
                // También podrías redirigir al usuario a la página de inicio de sesión aquí
            }
        };

        const interval = setInterval(checkTokenExpiration, 1000); // Verificar cada segundo

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, [tokenExpiration]);

    return <AuthContext.Provider value={{signup, user, isAuthenticated, signin, isLogged, currentUser}}>{children}</AuthContext.Provider>;
};
