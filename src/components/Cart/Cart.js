import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useProfile } from "../../Contexts/UserContext";
import "./Cart.css";

const Cart = () => {

    const { profile, setProfile } = useProfile(true);


    return (


        < Container className=" mt-5" >

            <Row className="mt-5 justify-content-center">

                <Col className="mt-5 col-md-12 col-12">
                    <Card>
                        {profile && (

                            <Card.Body style={{ maxHeight: "800px", overflowY: "auto", "padding": "2px" }} >
                                
                                <Container className="fluid">
                                    <Row className="mt-4">
                                        <Col className="col-md-6 col-6 p-0">
                                            Chicken Wings Fried - Four Pieces
                                        </Col>
                                        <Col className="col-md-2 col-3 p-0" >
                                            <div className="count-btn">
                                                <div className="btn link-no-decoration ">-</div>
                                                <div className="btn disabled link-no-decoration">1</div>
                                                <div className="btn text-success link-no-decoration">+</div>
                                            </div>
                                        </Col>
                                        <Col className="col-md-3 col-3 p-0" style={{ "textAlign": "center" }} >
                                            <div className="btn link-no-decoration text-dark ">10</div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col className="col-md-6 col-6 p-0">
                                            Chicken Wings Fried - Four Pieces
                                        </Col>
                                        <Col className="col-md-2 col-3 p-0" >
                                            <div className="count-btn">
                                                <div className="btn link-no-decoration ">-</div>
                                                <div className="btn disabled link-no-decoration">1</div>
                                                <div className="btn text-success link-no-decoration">+</div>
                                            </div>
                                        </Col>
                                        <Col className="col-md-3 col-3 p-0" style={{ "textAlign": "center" }} >
                                            <div className="btn link-no-decoration text-dark ">10</div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col className="col-md-6 col-6 p-0">
                                            Chicken Wings Fried - Four Pieces
                                        </Col>
                                        <Col className="col-md-2 col-3 p-0" >
                                            <div className="count-btn">
                                                <div className="btn link-no-decoration ">-</div>
                                                <div className="btn disabled link-no-decoration">1</div>
                                                <div className="btn text-success link-no-decoration">+</div>
                                            </div>
                                        </Col>
                                        <Col className="col-md-3 col-3 p-0" style={{ "textAlign": "center" }} >
                                            <div className="btn link-no-decoration text-dark ">10</div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col className="col-md-6 col-6 p-0">
                                            Chicken Wings Fried - Four Pieces
                                        </Col>
                                        <Col className="col-md-2 col-3 p-0" >
                                            <div className="count-btn">
                                                <div className="btn link-no-decoration ">-</div>
                                                <div className="btn disabled link-no-decoration">1</div>
                                                <div className="btn text-success link-no-decoration">+</div>
                                            </div>
                                        </Col>
                                        <Col className="col-md-3 col-3 p-0" style={{ "textAlign": "center" }} >
                                            <div className="btn link-no-decoration text-dark ">10</div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col className="col-md-6 col-6 p-0">
                                            Chicken Wings Fried - Four Pieces
                                        </Col>
                                        <Col className="col-md-2 col-3 p-0" >
                                            <div className="count-btn">
                                                <div className="btn link-no-decoration ">-</div>
                                                <div className="btn disabled link-no-decoration">1</div>
                                                <div className="btn text-success link-no-decoration">+</div>
                                            </div>
                                        </Col>
                                        <Col className="col-md-3 col-3 p-0" style={{ "textAlign": "center" }} >
                                            <div className="btn link-no-decoration text-dark ">10</div>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>

                        )}
                    </Card>
                </Col>
            </Row>

        </Container >

    );


}

export default Cart;