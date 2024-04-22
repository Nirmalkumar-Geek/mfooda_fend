import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, path }) => {  

    useEffect(() => {

        console.log("PrivateRoute did mount")

        return () => {

            console.log("PrivateRoute did un mount")

        }

    })


    const isLoggedIn = useSelector(state => state.rootReducer.session.isAuthenticated);

    return isLoggedIn ? <Element /> : <Navigate to='/login' />;
};

export default PrivateRoute;
