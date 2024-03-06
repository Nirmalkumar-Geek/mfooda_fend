import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import restaurants from "../../utils/RestaurantUtils";
import { Link } from "react-router-dom";



const Restaurant = () => {


    return (

        <div style={{ "top": "60px", "position": "relative" }}>
            <Container >
                <Row>
                    
                    {restaurants.map((value,index)=>{

                        return(


                            <Col className="mt-4" key={index}>

                                <Link to={"/restaurants/"+value.name} style={{"textDecoration":"none"}}>
                                    <Card style={{ width: '17rem' }} className="mx-auto border-0">
                                        <Card.Img variant="top" className="w-100" style={{ height: '13rem', borderRadius: '18px' }} src={value.image_link} />
                                        <Card.Body>
                                            <Card.Title>California Burrito</Card.Title>
                                            <Card.Text>
                                                rating
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>

                            </Col>
                        )

                    })}

                </Row>
            </Container>
        </div>

    );



}


export default Restaurant;



