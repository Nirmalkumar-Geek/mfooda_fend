import React, { Suspense,useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'


const Login = React.lazy(() => import('./components/Signin/Signin'))
const Register = React.lazy(() => import('./components/Registration/Registration'))
const Spinner = React.lazy(() => import('./components/Payment/Spinner'))
const DefaultLayout = React.lazy(() => import('./components/DefaultLayout/DefaultLayout'))

function App() {


  useEffect(()=>{

    console.log("App did  mount")

      return () =>{

        console.log("App did un mount")

      }

  })


  return (

    <div className='App'>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route exact path='/login' name="Login Page" element={<Login />} />
            <Route exact path='/register' name="Registration Page" element={<Register />} />
            <Route exact path='*' name="Default Page" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>

  );
}

export default App;
