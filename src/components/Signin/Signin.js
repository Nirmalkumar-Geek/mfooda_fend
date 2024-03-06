import React from "react";
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom";


const Signin = () => {
    
    const navigate = useNavigate();
    const { doLogin } = useAuth();
    const handleLogin = async (event) => {
        event.preventDefault(); 
        await doLogin(); 
        navigate("/"); 
    };
    return (

        <Container className="mt-5 pt-5">
            <Row className="justify-content-center">
                <Col className="col-md-4">
                    <Card >
                        <div className="text-center">
                            <Card.Header><h3>Login</h3></Card.Header>
                        </div>
                        <Card.Body>

                            <Form >
                                <Form.Group controlId="formBasicEmail" >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>

                                <div className="text-center">
                                    <Button className=" mt-3 " onClick={handleLogin} variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>


    );


}


export default Signin;