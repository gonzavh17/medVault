import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, currentRequest, googleLoginRequest } from "../api/auth";
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
    const [isAuthenticatedLocally, setIsAuthenticatedLocally] = useState(false);
    const [isAuthenticatedWithGoogle, setIsAuthenticatedWithGoogle] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [tokenExpiration, setTokenExpiration] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false)
    console.log(isAuthenticated);

    const getCurrentUser = async () => {
        try {
            const res = await currentRequest();
            const userData = res.data;
            setCurrentUser(userData);
            console.log('CurrentUser', userData); 
            setIsAuthenticated(true)
            setIsLogged(true);
        } catch (error) {
            console.log(error);
        }
    };

    const howIsLogged = async () => {
        try {
            const userData = await getCurrentUser();
            console.log('USUARIO', userData);
            if (userData.googleId) {
                console.log('Logueado con google', isAuthenticatedWithGoogle);
                setIsAuthenticatedWithGoogle(true);
            } else {
                setIsAuthenticatedLocally(true);
                console.log('Logueo local');
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            const userData = res.data.payload;
            setUser(userData);
            setIsRegistered(true)
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


    useEffect(() => {
        const checkTokenExpiration = () => {
            const now = new Date();
            if (tokenExpiration && now > tokenExpiration) {
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        const interval = setInterval(checkTokenExpiration, 1000); 

        return () => clearInterval(interval); 
    }, [tokenExpiration]);


    const googleSignin = async () => {
        try {
            const response = await googleLoginRequest();
            // Si la respuesta es exitosa, establece isAuthenticated en true
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }
    };
    return <AuthContext.Provider value={{signup, user, googleSignin, isAuthenticated, signin, isLogged, currentUser, howIsLogged, isRegistered}}>{children}</AuthContext.Provider>;
};
