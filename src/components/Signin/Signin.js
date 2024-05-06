import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import { useSelector, useDispatch } from 'react-redux';
import { setLoginEmail, setLoginPassword, setIsAuthenticated, setAccessToken, setUserID } from "../../redux/reducers";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";


const Signin = () => {

    const dispatch = useDispatch();
    const email = useSelector((state) => state.rootReducer.login.email);
    const password = useSelector((state) => state.rootReducer.login.password);
    const isAuthenticated = useSelector(state => state.rootReducer.session.isAuthenticated);
    const access_token = useSelector(state => state.rootReducer.session.accessToken);
    const [visibleErrMessage, setVisibleErrMessage] = useState(false)

    useEffect(() => {

        

        let token = localStorage.getItem('access_token')

        if (token) {

            const decodedToken = jwtDecode(token);

            dispatch(setUserID(decodedToken.data.user_id))

            dispatch(setIsAuthenticated(true))

        }

    }, [access_token])

    useEffect(()=>{

        console.log("Signin did mount")

        return () =>{

            console.log("Signin did un mount")

        }

    })

    const handleLogin = async () => {

        try {

            const credentials = { "email": email, "password": password }
            const result = await axios.post("https://api.selfmade.city/api/auth/users/signin", credentials)

            if (result.data && result.data.status === "success") {

                if (result.data.access_token) {

                    localStorage.setItem('access_token', result.data.access_token)

                    dispatch(setAccessToken(result.data.access_token))

                }


            }

        } catch (error) {

            setVisibleErrMessage(true)

        }

    };

    return (

        <div>
            {

                isAuthenticated ? (

                    <Navigate to="/" replace />

                ) : (

                    <Container className="mt-5 pt-5">
                        <Row className="justify-content-center">
                            <Col className="col-md-4">
                                {
                                    visibleErrMessage && (
                                        <Alert variant="danger" onClose={() => setVisibleErrMessage(false)} dismissible>
                                            Email or Password Incorrect
                                        </Alert>
                                    )
                                }
                                <Card >
                                    <div className="text-center">
                                        <Card.Header><h3>Login</h3></Card.Header>
                                    </div>
                                    <Card.Body>

                                        <Form >
                                            <Form.Group controlId="formBasicEmail" >
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" onChange={(event) => { dispatch(setLoginEmail(event.target.value)); setVisibleErrMessage(false) }} placeholder="Enter email" autoComplete="on" />

                                            </Form.Group>

                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" onChange={(event) => { dispatch(setLoginPassword(event.target.value)); setVisibleErrMessage(false) }} placeholder="Password" autoComplete="on" />
                                            </Form.Group>

                                            <div className="text-center">
                                                <Button className=" mt-3 " onClick={handleLogin} variant="primary">
                                                    Submit
                                                </Button>
                                                    
                                            </div>
                                        </Form>
                                            <p className="mt-3 text-center">Don't have an account yet? <Link to='/register'>Register</Link></p>
                                    </Card.Body>
                                </Card>

                            </Col >
                        </Row >
                    </Container >

                )
            }
        </div>

    );


}


export default Signin;