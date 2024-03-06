import React, { useEffect } from "react";
import CNavBar from "./components/Nav/NavBar";
import './App.css'
import Restaurant from "./components/Content/Restaurants";
import { Routes, Route, useNavigate } from "react-router-dom";
import Menu from "./components/Content/Menu";
import Signin from "./components/Signin/Signin";
import { useAuth } from "./Contexts/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./components/Profile/Profile";
import { UserProvider } from "./Contexts/UserContext";
import Cart from "./components/Cart/Cart";


function App() {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {

    if (!isAuthenticated) {

      console.log("need to redirect")
      navigate('/signin');

    }

  }, [isAuthenticated, navigate])

  return (
    <div className='App'>

      {isAuthenticated && <CNavBar />}

      <UserProvider>

        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<PrivateRoute > <Profile /> </PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute > <Cart /> </PrivateRoute>} />
          <Route path="/" element={<PrivateRoute > <Restaurant /> </PrivateRoute>} />
          <Route path="/restaurants/:restaurant_name" element={<PrivateRoute path='/restaurants/:restaurant_name'> <Menu /> </PrivateRoute>} />
        </Routes>

      </UserProvider>
      


    </div>
  );
}

export default App;
