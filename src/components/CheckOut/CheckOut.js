import { loadStripe } from '@stripe/stripe-js';
import Sample from '../Sample/Sample';
import { Elements } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Spinner from '../Payment/Spinner';
import { Col, Row } from "react-bootstrap"
import { BiErrorCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";

const stripePromise = loadStripe('pk_test_51OwXLZEvae3ml9CKX3jJjRSrCOL71loUjG2qRRv00bNLTII0WtfEdbwaMzKnadVkbAKJ7DrFUpuWKvV3aAxGcpw500bNSRXz80');

const CheckOut = () => {

    const items = useSelector((state) => state.rootReducer.cart.items);
    const customer_id = useSelector(state => state.rootReducer.profile.user_id);
    const restaurant_id = useSelector(state => state.rootReducer.cart.restaurant_id);
    const [options, setOptions] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useState(() => {


        const getClientSecret = async () => {

            try {

                let payload = { 'restaurant_id': null, "customer_id": null, "payment_method_type": "card", "order_status": "created", "line_items": null, "delivery_address": "address" }
                let  line_items = []

                Object.keys(items).map((key)=>{

                    line_items.push({ 'name': items[key].name, "quantity": items[key].count, "item_id": items[key].id, "price": items[key].price  })

                    return ''

                })

                payload.line_items =  line_items
                payload.customer_id = customer_id
                payload.restaurant_id = restaurant_id
                console.log(payload)
                const result = await axios.post("https://api.selfmade.city/api/payment/create-payment-intent",payload)

                console.log(result)

                if (result.data) {

                    setOptions(result.data)

                }else{

                    setError(true)

                }
            } catch (error) {

                console.log(error)
                setError(true)

            }

        }

        getClientSecret()

        setLoading(false)


    }, [])

    return (

        <Container>
            {
                loading ? (

                    <Spinner />

                ) : (
                    
                        !error ? (
                            options.clientSecret && (<Elements stripe={stripePromise} options={options}>
                                <Sample />
                            </Elements>)
                        ) : (

                                <Row className="justify-content-center mt-5 pt-5">
                                    <Col className="col-4 text-center mt-5">
                                        <BiErrorCircle className="flex-shrink-0 me-2 mt-5" size={100} color='red' />
                                    </Col>
                                    <Col className="col-12 text-center mt-3">
                                        <div style={{ 'fontSize': '18px' }}>Payment Failed</div>
                                    </Col>
                                </Row>

                        )
                    
                )
            }
        </Container>

    )


}

export default CheckOut;