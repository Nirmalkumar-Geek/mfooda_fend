import { createContext, useContext, useState } from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {

    const [profile, setProfile] = useState({"name":"Nirmal Kumar","email":"test@gmail.com","address":"test address"});



    return (

        <UserContext.Provider value={{ profile, setProfile }}>

            {children}

        </UserContext.Provider>

    );


}

export const useProfile = () => {
    return useContext(UserContext);
};