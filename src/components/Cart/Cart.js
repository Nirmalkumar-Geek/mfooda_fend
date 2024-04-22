import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Cart.css";
import { useSelector, useDispatch } from 'react-redux';
import { add_item, remove_item } from "../../redux/reducers";
import { Navigate, Link } from "react-router-dom";

const Cart = () => {

    const items = useSelector((state) => state.rootReducer.cart.items);
    const total = useSelector((state) => state.rootReducer.cart.total);
    const restaurant_id = useSelector((state) => state.rootReducer.cart.restaurant_id);
    const details = useSelector((state) => state.rootReducer.cart);
    const dispatch = useDispatch();


    const increaseCount = (index, item_name, item_price) => {

        let item = { id: null, name: null, price: null, count: 1 }

        item.id = index
        item.name = item_name
        item.price = item_price

        dispatch(add_item({ restaurant_id, item }))

    };

    const decreaseCount = (index) => {



        dispatch(remove_item({ index }))


    }


    return (


        < Container className=" mt-5" >

            {Object.keys(items).length ? (
                <>
                    <Row className="mt-5 justify-content-center">

                        <Col className="mt-5 col-md-12 col-12">

                            <Card>


                                <Card.Body style={{ maxHeight: "800px", overflowY: "auto", "padding": "2px" }} >

                                    <Container className="fluid mb-5" >
                                        {

                                            Object.keys(items).map((key, index) => {

                                                return (

                                                    <Row className="mt-4" key={index}>
                                                        <Col className="col-md-5 col-5 ">
                                                            {items[key].name}
                                                        </Col>
                                                        <Col className="col-md-3 col-3 " >
                                                            <div className="count-btn">
                                                                <div className="btn link-no-decoration " onClick={() => { decreaseCount(key)}}>-</div>
                                                                <div className="btn disabled link-no-decoration" ><strong>{items[key].count}</strong></div>
                                                                <div className="btn text-success link-no-decoration" onClick={() => { increaseCount(key, items[key].name, items[key].price) }}>+</div>
                                                            </div>
                                                        </Col>
                                                        <Col className="col-md-4 col-4 " style={{ "textAlign": "center" }} >
                                                            <div className="btn link-no-decoration text-dark ">RM{items[key].price * items[key].count}</div>
                                                        </Col>
                                                    </Row>

                                                )


                                            })

                                        }


                                    </Container>
                                    <Container style={{ "borderTop": "5px", "borderColor": "black" }}>
                                        <Row className="text-center" >
                                            <Col className="col-5">

                                            </Col>
                                            <Col className="col-3">
                                                <strong>TOTAL</strong>
                                            </Col>
                                            <Col className="col-4">
                                                RM{total}
                                            </Col>
                                        </Row>
                                    </Container>

                                </Card.Body>


                            </Card>
                        </Col>

                    </Row>
                    <Container className="mt-3 mb-5">
                        <Row>
                            <Col className="col-12 text-center">
                                <Link to='/checkout'>
                                    <Button variant="success">Place Order</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (<Row className="mt-5 text-center">

                    <Col className="mt-5 col-12"><h3>Your cart is empty</h3></Col>

            </Row>)}

        </Container >

    );


}

export default Cart;