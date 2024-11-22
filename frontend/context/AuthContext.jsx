import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../config";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token") || '';
        if (token != null || token != undefined || token.length > 0) {
            axios.get(apiUrl + 'auth/user', {
                headers: {
                    Authorization: token,
                }
            }).then(res => {
                if (res.status == 200) {
                    console.log(res.data.user);
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                }
            }).catch(error => {
                console.log(error.message);
                setUser({});
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            });
        } else {
            setUser({});
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};