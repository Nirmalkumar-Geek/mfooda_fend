import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setEmail, setIsAuthenticated } from "../../redux/reducers";

const Profile = () => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [UserForm, setUserForm] = useState({ "name": "", "email": "", "address": "" })
    const user_id = useSelector(state => state.rootReducer.profile.user_id);
    const profile = useSelector(state => state.rootReducer.profile);

    const UpdateProfile = () => {



    }

    const ShowModel = () => {

        setShow(true);

    }

    const HideModel = () => {

        setShow(false);

    }

    const getProfile = async () => {

        if (user_id) {

            try {

                const url = "https://api.selfmade.city/api/users/profile/" + user_id

                const result = await axios.get(url)

                console.log(result.data)
                if (result.data && result.data.status === "success") {

                    dispatch(setUserName(result.data.data.username))
                    dispatch(setEmail(result.data.data.email))

                }

            } catch (error) {


            }


        }



    }

    useEffect(() => {
        console.log("profile did mount")

        getProfile()

        return () =>{

            console.log("profile did un mount")

        }

    }, [])



    return (


        < Container className=" mt-5" >
            <Row className="mt-5 justify-content-center">
                <Col className="mt-5 col-md-8">
                    {profile.username && profile.email && (<Card>
                        <Card.Header>Profile</Card.Header>

                        <Card.Body>
                            <Card.Title>Name</Card.Title>
                            <Form.Control disabled placeholder={profile.username} />
                            <Card.Title>Email</Card.Title>
                            <Form.Control disabled placeholder={profile.email} />
                            <Card.Title>Address</Card.Title>
                            <Form.Control disabled placeholder={profile.address} />
                            <br />
                        </Card.Body>

                        <Card.Footer>

                            <Row>
                                <Col>
                                    <div className="text-center">
                                        <Button variant="primary" onClick={ShowModel}>Edit</Button>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="text-center">
                                        <Button variant="danger" onClick={() => { localStorage.removeItem('access_token'); dispatch(setIsAuthenticated(false)); window.location = '/' }}>Logout</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>)}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Modal show={show} onHide={HideModel}>
                        <Modal.Header closeButton>
                            <Modal.Title>Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        value={UserForm.name}
                                        type="text"
                                        placeholder="Name"
                                        onChange={(event) => { console.log(event.target.value); let username = event.target.value; setUserForm({ ...UserForm, "name": username }) }}
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control

                                        type="email"
                                        placeholder="name@example.com"
                                        onChange={(event) => { let email = event.target.value; setUserForm({ ...UserForm, "email": email }) }}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control

                                        as="textarea"
                                        rows={3}
                                        onChange={(event) => { let address = event.target.value; setUserForm({ ...UserForm, "address": address }) }}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={HideModel}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={UpdateProfile}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container >

    );


}

export default Profile;