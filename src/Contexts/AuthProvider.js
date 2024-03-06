import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setisAuthenticated] = useState(false);

    const doLogin = () => {

        setisAuthenticated(true);


    }

    const doLogout = () => {

        setisAuthenticated(false);

    }

    return (

        <AuthContext.Provider value={{ isAuthenticated, doLogin, doLogout }}>

            {children}

        </AuthContext.Provider>

    );


}

export const useAuth = () => {
    return useContext(AuthContext);
};