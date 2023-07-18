import React, { createContext, useState, useEffect, useContext } from 'react';
import Api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const storagedToken = sessionStorage.getItem('@App:token');

        if (storagedToken) {
            setUserAuthenticated(true);
            Api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

            Api.post('me').then((response) => {
                setUserData(response.data);
            }).catch((error) => {
                console.log(error)
            });
        }
    }, []);

    async function Login(userData) {
        const response = await Api.post('login', userData);

        Api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
        sessionStorage.setItem('@App:token', response.data.access_token);

        const userResponse = await Api.post('me');
        setUserData(userResponse.data);

        setUserAuthenticated(true);
    }

    function Logout() {
        setUserAuthenticated(false)
        setUserData(null);
        sessionStorage.setItem('@App:token', "");
    }

    return (
        <AuthContext.Provider
            value={{ Login, Logout, userAuthenticated, userData}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}