import React,{useEffect,useState} from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CRow,
    CAlert,
} from "@coreui/react";
import { useSelector, useDispatch } from 'react-redux';
import { setRegEmail, setRegUsername, setRegPassword, setConfirmPassword, setRegPhoneNumber, restRegForm } from "../../redux/reducers";
import axios from "axios";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilCheckCircle } from "@coreui/icons";

const Register = () => {

    const dispatch = useDispatch()

    const username = useSelector((state) => state.rootReducer.registration.username.value);
    const email = useSelector((state) => state.rootReducer.registration.email.value);
    const phone_number = useSelector((state) => state.rootReducer.registration.phone_number.value);
    const password = useSelector((state) => state.rootReducer.registration.password.value);
    const confirmPassword = useSelector((state) => state.rootReducer.registration.confirmpassword.value);
    const register = useSelector((state) => state.rootReducer.registration);

    const [loader,setLoader] = useState(false)
    const [error,setError] = useState(false);
    const [registration,setRegistration] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const submitForm = async () =>{

        try{

            const payload = {
                "username": username,
                "email": email,
                "phone_number": phone_number,
                "password": password,
                "confirmpassword": confirmPassword
            }
            console.log(payload)
            const result = await axios.post('https://api.selfmade.city/api/auth/users/registration', payload)
            console.log(result)
            if (result.data.status === 'success') {

                setRegistration(true)

            }else{

                setError(true)
                setErrorMessage(result.data.error)

            }

        }catch(error){

            console.log(error.response.data.error)
            console.log(error)
            setError(true)
            if (error.response.data.error){

                setErrorMessage(error.response.data.error)

            } else if (error.response.data.message){

                setErrorMessage(error.response.data.message)

            }else{

                setErrorMessage("An error occurred while processing your request.");

            }

        }


    }

    return (
        <CContainer className="mt-5">
            <CRow className="justify-content-center">
                {console.log(register)}
                    {
                        !registration ? (
                        <CCol md={9} lg={7} xl={6} className="text-center">
                            {
                                error && (
                                    <CAlert
                                        color="warning"
                                        dismissible
                                        onClose={()=>{setError(false)}}
                                    >
                                        <strong>{errorMessage}</strong>
                                    </CAlert>
                                )
                            }
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm className="needs-validation" >
                                        <h3 className="text-medium-emphasis text-center mb-5">Create your account</h3>
                                        <CInputGroup className="mb-3">
                                            <CFormInput
                                                placeholder="Username"
                                                autoComplete="username"
                                                type="text"
                                                required
                                                onChange={(event) => { setError(false); setErrorMessage(""); dispatch(setRegUsername(event.target.value)) }}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">

                                            <CFormInput
                                                placeholder="Email"
                                                autoComplete="email"
                                                type="email"
                                                required
                                                onChange={(event) => { setError(false); setErrorMessage("");  dispatch(setRegEmail(event.target.value)) }}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">

                                            <CFormInput
                                                placeholder="Phone Number"
                                                autoComplete="tel"
                                                type="tel"
                                                pattern="[0-9]*"
                                                required
                                                onChange={(event) => { setError(false); setErrorMessage("");  dispatch(setRegPhoneNumber(event.target.value)) }}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">

                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="new-password"
                                                required
                                                onChange={(event) => { setError(false); dispatch(setRegPassword(event.target.value)) }}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">

                                            <CFormInput
                                                type="password"
                                                placeholder="Repeat password"
                                                autoComplete="new-password"
                                                required
                                                onChange={(event) => { setError(false); dispatch(setConfirmPassword(event.target.value)) }}
                                            />
                                        </CInputGroup>
                                        <div className="d-grid">
                                            <CButton
                                                color="success"
                                                onClick={submitForm}
                                            >
                                                Create Account
                                            </CButton>
                                        </div>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        ) : (

                            <CCol md={4} lg={4} xl={4}>
                                <div className="text-center mt-5 ">
                                    <CAlert color="success" variant="solid">
                                        <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
                                        Registration Successfull
                                    </CAlert>
                                    <Link to='/login'><CButton className="mt-4">Login</CButton></Link>
                                </div>
                            </CCol>

                        )
                    }
                    
                
            </CRow>
        </CContainer>
    );
};

export default Register;
