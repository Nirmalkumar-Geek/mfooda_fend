import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setRestaurants } from "../../redux/reducers";
import axios from "axios";
import './Restaurant.css'
import OptimizedImage from "../Order/OptimizedImage";
import { MdStars } from "react-icons/md";
import { CCol } from "@coreui/react";
import Loader from "../Payment/Loader";
import Spinner from "../Payment/Spinner";

const Restaurant = () => {

    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.rootReducer.restaurant.restaurants);
    const [loading, setLoading] = useState(false)
    const [init, setInit] = useState(false)

    const getRestaurants = async () => {

        try {

            setLoading(true)

            const result = await axios.get('https://api.selfmade.city/api/restaurants')

            if (result.data && result.data.status == "success") {


                if (result.data.data) {

                    dispatch(setRestaurants(result.data.data))

                }
                setInit(true)


            }

            setLoading(false)
        } catch (error) {


            setLoading(false)
            console.log(error)

        }

    }


    useEffect(() => {

        console.log("restaurnat did mount")

        getRestaurants()

        return () => {

            console.log("restaurnat did un mount")

        }

    }, [])

    useEffect(() => {

        const getRestaurants_poling = async () => {

            try {
                const result = await axios.get('https://api.selfmade.city/api/restaurants')

                console.log(result)

                if (result.data && result.data.status == "success") {

                    if (result.data.data) {

                        dispatch(setRestaurants(result.data.data))

                    } else {

                        dispatch(setRestaurants({}))

                    }


                }
            } catch (error) {

                console.log(error)

            }

        }

        if (init) {

            const pollingInterval = setInterval(getRestaurants_poling, 5000);

            return () => clearInterval(pollingInterval);

        }




    }, [init])


    return (

        <div style={{ "top": "60px", "position": "relative" }}>
            {
                !loading ? (
                    <Container >

                        <Row>
                            {
                                Object.keys(restaurants).length === 0 ? (

                                    <CCol className=" text-center" >

                                        <Loader />

                                    </CCol>

                                ) : (

                                    Object.keys(restaurants).map((key, value) => {

                                        return (


                                            <Col className="mt-4" xs={12} sm={6} md={4} lg={3} key={key}>

                                                <Link to={"/restaurants/" + key} style={{ "textDecoration": "none" }}>

                                                    <Card style={{ width: '17rem' }} className="mx-auto border-0">
                                                        <OptimizedImage
                                                            src={"https://api.selfmade.city/" + restaurants[key].banner_path}
                                                            alt="Example Image"
                                                            title="Example Title"
                                                        />

                                                        <Card.Body >
                                                            <span style={{ fontSize: '15px' }} className="custom-span">{restaurants[key].name}</span>
                                                            <div style={{ display: 'flex', alignItems: 'center' }} >
                                                                <MdStars color='green' size='18' />
                                                                <span style={{ fontSize: '15px', marginLeft: '3px', marginRight: '3px', fontStyle: 'bold' }} className="custom-span">{restaurants[key].rating.toFixed(1)}</span>
                                                            </div>

                                                        </Card.Body>
                                                    </Card>

                                                </Link>

                                            </Col>
                                        )

                                    })
                                )


                            }
                        </Row>
                    </Container>
                ) : (

                    <Spinner />

                )
            }
        </div>

    );



}


export default Restaurant;



