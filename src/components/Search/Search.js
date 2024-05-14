import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setRestaurants } from "../../redux/reducers";
import axios from "axios";
import OptimizedImage from "../Order/OptimizedImage";
import { MdStars } from "react-icons/md";
import { CCol } from "@coreui/react";
import Loader from "../Payment/Loader";
import Spinner from "../Payment/Spinner";
import SearchBar from "./SearchBar";

const Search = () => {
    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.rootReducer.restaurant.restaurants);
    const [loading, setLoading] = useState(false);
    const [init, setInit] = useState(false);
    const [filteredRestaurants, setFilteredRestaurants] = useState({});

    const getRestaurants = async () => {
        try {
            setLoading(true);
            const result = await axios.get(process.env.REACT_APP_API_HOST + '/api/restaurants');
            if (result.data && result.data.status === "success") {
                if (result.data.data) {
                    dispatch(setRestaurants(result.data.data));
                }
                setInit(true);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getRestaurants();
        return () => {
            console.log("restaurant did unmount");
        }
    }, []);

    useEffect(() => {
        const getRestaurantsPolling = async () => {
            try {
                const result = await axios.get(process.env.REACT_APP_API_HOST + '/api/restaurants');
                if (result.data && result.data.status === "success") {
                    if (result.data.data) {
                        dispatch(setRestaurants(result.data.data));
                    } else {
                        dispatch(setRestaurants({}));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (init) {
            const pollingInterval = setInterval(getRestaurantsPolling, 5000);
            return () => clearInterval(pollingInterval);
        }
    }, [init]);

    const handleSearch = (query) => {
        if (query.trim() === "") {
            setFilteredRestaurants({});
            return;
        }

        const filtered = Object.keys(restaurants).filter(key =>
            restaurants[key].name.toLowerCase().includes(query.toLowerCase())
        ).reduce((obj, key) => {
            obj[key] = restaurants[key];
            return obj;
        }, {});

        setFilteredRestaurants(filtered);
    }


    return (
        <div style={{ "top": "60px", "position": "relative" }}>
            <Container>
                {console.log(filteredRestaurants)}
                <Row className="justify-content-center ">
                    <Col xs={12} md={6} className="mt-3 text-center">
                        <SearchBar handleSearch={handleSearch} />
                    </Col>
                </Row>
                <Row>
                    {!loading ? (
                        Object.keys(filteredRestaurants).length === 0 ? (
                            <CCol className="text-center">
                                <Loader />
                            </CCol>
                        ) : (
                            Object.keys(filteredRestaurants).map((key) => (
                                <Col className="mt-4" xs={12} sm={6} md={4} lg={3} key={key}>
                                    <Link to={"/restaurants/" + key} style={{ "textDecoration": "none" }}>
                                        <Card style={{ width: '17rem' }} className="mx-auto border-0">
                                            <OptimizedImage
                                                src={process.env.REACT_APP_API_HOST + "/" + filteredRestaurants[key].banner_path}
                                                alt="Example Image"
                                                title="Example Title"
                                            />
                                            <Card.Body>
                                                <span style={{ fontSize: '15px' }} className="custom-span">{filteredRestaurants[key].name}</span>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <MdStars color='green' size='18' />
                                                    <span style={{ fontSize: '15px', marginLeft: '3px', marginRight: '3px', fontStyle: 'bold' }} className="custom-span">{filteredRestaurants[key].rating.toFixed(1)}</span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        )
                    ) : (
                        <Spinner />
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default Search;
