import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, currentRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error ('useAuth must be used within an authProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLogged, setIsLogged] = useState(false)



    const getCurrentUser = async () => {
        try {
            const res = await currentRequest();
            const userData = res.data;
            setCurrentUser(userData);
            console.log('CurrentUser', userData); 
            setIsAuthenticated(true);
            setIsLogged(true);
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
            setIsLogged(true);
    
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

    return <AuthContext.Provider value={{signup, user, isAuthenticated, signin, isLogged, currentUser}}>{children}</AuthContext.Provider>;
};