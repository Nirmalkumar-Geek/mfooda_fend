import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import menu from "../../utils/MenuUtils";
import { useParams } from "react-router-dom";

const Menu = () => {

    const [items, setItems] = useState(null);
    const [btn, setBtn] = useState({}); // Initialize btn state as an empty object
    const [count, setCount] = useState({});

    const { restaurant_name } = useParams();

    useEffect(() => {
        if (menu[restaurant_name]) {
            setItems(menu[restaurant_name]);

            // Initialize the btn state with keys as index and value as false
            let item_count = {};
            let initialBtnState = {};
            menu[restaurant_name].forEach((value, index) => {
                initialBtnState[index] = false;
                item_count[index] = 0;
            });
            setBtn(initialBtnState);
            setCount(item_count);
            console.log(item_count)
        }
    }, [restaurant_name]);

    const handleAddToCart = (index) => {
        setBtn(prevState => ({
            ...prevState, // Keep the previous state
            [index]: true // Update the specific button state to true
        }));
    };

    const increaseCount = (index) => {

        setCount(prevState => (

            {

                ...prevState,
                [index]: count[index] + 1


            }

        )

        )

    };

    const decreaseCount = (index) =>{

        setCount(prevState =>(

            {

                ...prevState,
                [index] : count[index] - 1

            }


        )


        )


    }

    return (
        <div>
            <Container className="mt-5">
                <Row>
                    {items && items.map((value, index) => {
                        return (
                            <Col key={index} className="mt-5" >
                                <Card style={{ width: '18rem' }} className="mx-auto border-0 bg-light">
                                    <Card.Img variant="top" src={value.image} className="rounded" />
                                    <Card.Body style={{ textAlign: "left" }}>
                                        <Card.Title>{value.name}</Card.Title>
                                        <Card.Text>
                                            RM {value.price}
                                        </Card.Text>
                                        <div style={{ textAlign: "center" }}>
                                            {count[index] ? (
                                                <>
                                                    <Row className="text-center" >
                                                        <Col className="p-0 " >
                                                            <Button variant="danger" onClick={() => decreaseCount(index)}>-</Button>
                                                        </Col>
                                                        <Col className="p-0 m-0">
                                                            <h2 className="m-0">{count[index]}</h2>
                                                        </Col>
                                                        <Col className="p-0">
                                                            <Button variant="danger" onClick={() => increaseCount(index)}>+</Button>
                                                        </Col>
                                                    </Row>
                                                </>

                                            ) : (
                                                    <Button variant="success" onClick={() => increaseCount(index)}>Add to Cart</Button>
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
