import React, { useState,useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useProfile } from "../../Contexts/UserContext";

const Profile = () => {

    const { profile, setProfile } = useProfile();
    const [show, setShow] = useState(false);
    const [UserForm, setUserForm] = useState({ "name": "", "email": "", "address": "" })

    const UpdateProfile = () => {

        setProfile(UserForm);
        setUserForm({ "name": "", "email": "", "address": "" });
        setShow(false)


    }

    const ShowModel = () => {

        setShow(true);

    }

    const HideModel = () => {

        setShow(false);

    }

    useEffect(()=>{

        setUserForm({ "name": profile.name, "email": profile.email, "address": profile.address })

    },[profile])

    return (


        < Container className=" mt-5" >
           
            <Row className="mt-5 justify-content-center">
                <Col className="mt-5 col-md-8">
                    <Card>
                        <Card.Header>Profile</Card.Header>
                        {profile && (
                            
                            <Card.Body>
                                <Card.Title>Name</Card.Title>
                                <Form.Control disabled placeholder={profile.name} />
                                <Card.Title>Email</Card.Title>
                                <Form.Control disabled placeholder={profile.email} />
                                <Card.Title>Address</Card.Title>
                                <Form.Control disabled placeholder={profile.address} />
                                <br />
                                <div className="text-center">
                                    <Button variant="primary" onClick={ShowModel}>Edit</Button>
                                </div>
                            </Card.Body>

                        )}
                    </Card>
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