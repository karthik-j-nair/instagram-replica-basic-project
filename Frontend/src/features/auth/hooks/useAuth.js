import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/auth.api";

export function useAuth() {
    const context = useContext(AuthContext);
    
    const {setUser, setLoading, user, loading} = context;

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        const resonse = await register(username, email, password);
        setUser(resonse.user)
        setLoading(false);
    }


    const handleLogin = async (username, email) => {
        setLoading(true);
        const response = await login(username, email);
        setUser(response.user);
        
        setLoading(false);
    }

    return {
        user, loading, handleLogin, handleRegister
    }
}