import { createContext, useState } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
        const resonse = await register(username, email, password);
        setUser(resonse.user)
    } catch (error) {
        console.log(error);
        
    }
    finally{
        setLoading(false);
    }
  }

  const handleLogin = async (username, email) =>{
    setLoading(true);
    try {
        const response = await login(username, email);
        setUser(response.user);
    } catch (error) {
        console.log(error);
    }
    finally {
        setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{user, loading, handleRegister, handleLogin}}>
        {children}
    </AuthContext.Provider>
  )
}
