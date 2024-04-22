import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { add_item, remove_item, setMenuItems } from "../../redux/reducers";
import axios from "axios";
import OptimizedImage from "../Order/OptimizedImage";

const Menu = () => {

    const itemss = useSelector((state) => state.rootReducer.cart.items);
    const menuItems = useSelector((state) => state.rootReducer.menu.menuItems);
    const details = useSelector((state) => state.rootReducer.cart);

    const dispatch = useDispatch();

    const { restaurant_id } = useParams();

    const GetMenu = async (id) => {

        try {


            const result = await axios.get('https://api.selfmade.city/api/menu/' + id)

            console.log(result.data)

            if (result.data && result.data.status == "success") {

                dispatch(setMenuItems(result.data.data))

            } else if (result.data && result.data.status == "error" && result.data.data === null) {

                dispatch(setMenuItems({}))

            }


        } catch (error) {



            console.log(error)

        }

    }



    useEffect(() => {

        GetMenu(restaurant_id)

    }, [restaurant_id]);

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
        <div>
            <Container className="mt-5">
                {console.log(details)}
                <Row>
                    {Object.keys(menuItems).length != 0 && Object.keys(menuItems).map((key) => {
                        return (
                            <Col key={key} className="mt-5" >
                                <Card style={{ width: '18rem' }} className="mx-auto border-0 bg-light">
                                    <OptimizedImage
                                        src={"https://api.selfmade.city/" + menuItems[key].img_path}
                                        alt="Example Image"
                                        title="Example Title"
                                    />
                                    <Card.Body style={{ textAlign: "left" }}>
                                        <Card.Title>{menuItems[key].item_name}</Card.Title>
                                        <Card.Text>
                                            RM {menuItems[key].price}
                                        </Card.Text>
                                        <div style={{ textAlign: "center" }}>
                                            {console.log(menuItems[key])}
                                            {itemss[key] ? (
                                                <>
                                                    <Row className="text-center" >
                                                        <Col className="p-0 " >
                                                            <Button variant="danger" onClick={() => decreaseCount(key)}>-</Button>
                                                        </Col>
                                                        <Col className="p-0 m-0">
                                                            <h2 className="m-0">{itemss[key].count}</h2>
                                                        </Col>
                                                        <Col className="p-0">
                                                            <Button variant="danger" onClick={() => increaseCount(key, menuItems[key].item_name, menuItems[key].price)}>+</Button>
                                                        </Col>
                                                    </Row>
                                                </>

                                            ) : (
                                                <Button variant="success" onClick={() => increaseCount(key, menuItems[key].item_name, menuItems[key].price)}>Add to Cart</Button>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Menu;
