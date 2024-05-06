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
import { CCard, CFormSelect, CFormInput, CFormTextarea, CButton } from '@coreui/react';
import { Navigate } from 'react-router-dom';
import { clearCart } from '../../redux/reducers';

const stripePromise = loadStripe('pk_test_51OwXLZEvae3ml9CKX3jJjRSrCOL71loUjG2qRRv00bNLTII0WtfEdbwaMzKnadVkbAKJ7DrFUpuWKvV3aAxGcpw500bNSRXz80');

const CheckOut = () => {

    const items = useSelector((state) => state.rootReducer.cart.items);
    const customer_id = useSelector(state => state.rootReducer.profile.user_id);
    const restaurant_id = useSelector(state => state.rootReducer.cart.restaurant_id);
    const restaurant_name = useSelector(state => state.rootReducer.cart.restaurant_id);
    const [options, setOptions] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [address, setAddress] = useState(null)
    const [paymentMethodError, setPaymentMethodError] = useState(false)
    const [addressError, setAddressError] = useState(false)
    const [processCheckout, setProcessCheckout] = useState(false)
    const dispatch = useDispatch()

    const getClientSecret = async () => {

        try {

            let payload = { 'restaurant_id': null, "customer_id": null, "payment_method_type": paymentMethod, "order_status": "created", "line_items": null, "delivery_address": address }
            let line_items = []

            Object.keys(items).map((key) => {

                line_items.push({ 'name': items[key].name, "quantity": items[key].count, "item_id": items[key].id, "price": items[key].price })

                return ''

            })

            payload.line_items = line_items
            payload.customer_id = customer_id
            payload.restaurant_id = restaurant_id
            console.log(payload)
            const result = await axios.post("https://api.selfmade.city/api/payment/create-payment-intent", payload)

            console.log(result.data)

            if (result.data && result.data.data !== null) {

                setOptions(result.data)

            } else {

                console.log("api error", result)
                setError(true)

            }
        } catch (error) {

            console.log("api error", error)
            setError(true)

        }

        setLoading(false)

    }

    const createOrder = async () => {

        try {

            let payload = { 'restaurant_id': null, "customer_id": null, "payment_method_type": paymentMethod, "order_status": "created", "line_items": null, "delivery_address": address }
            let line_items = []

            Object.keys(items).map((key) => {

                line_items.push({ 'name': items[key].name, "quantity": items[key].count, "item_id": items[key].id, "price": items[key].price })

                return ''

            })

            payload.line_items = line_items
            payload.customer_id = customer_id
            payload.restaurant_id = restaurant_id
            console.log(payload)
            const result = await axios.post("https://api.selfmade.city/api/payment/create-order", payload)

            console.log(result.data)

            if (result.data && result.data.status === "success") {

                setOptions(true)

            } else {

                console.log("api error", result)
                setError(true)

            }
        } catch (error) {

            console.log("api error", error)
            setError(true)

        }

        setLoading(false)

    }


    const onSubmit = async () => {

        let error_1 = false
        let error_2 = false

        if (paymentMethod === "NA" || paymentMethod === null) {

            setPaymentMethodError(true)
            error_1 = true

        }

        if (address === null || address === "") {

            setAddressError(true)
            error_2 = true

        }

        console.log("addressError", addressError)
        console.log("paymentError", paymentMethodError)

        if (!error_1 && !error_2) {

            setProcessCheckout(true)
            if (paymentMethod === "card") {

                getClientSecret()

            }else if(paymentMethod === "cash"){

                createOrder()

            }



        }


    }

    useEffect(()=>{

        console.log("did mount checkout")


        return () =>{

            dispatch(clearCart())

            console.log("did unmount checkout")

        }


    },[])

    return (
        <Container className='mt-3'>
            {!processCheckout ? (
                <Row className="justify-content-center">
                    <Col className="col-md-4 col-12 mt-2">
                        {console.log(paymentMethod)}
                        {console.log(address)}
                        <CCard className='mt-5 p-3'>
                            <CFormSelect
                                aria-label="Please select payment method"
                                options={[
                                    { label: 'Please select payment method', value: 'NA' },
                                    { label: 'Card', value: 'card' },
                                    { label: 'Cash', value: 'cash' },
                                ]}
                                className='mb-3'
                                onChange={(event) => { setPaymentMethodError(false); setPaymentMethod(event.target.value) }}
                                invalid={paymentMethodError}
                                required
                            />
                            <CFormTextarea invalid={addressError} label="Delivery Address" onChange={(event) => { setAddressError(false); setAddress(event.target.value) }} rows={3} required />
                            <div className='text-center'>
                                <CButton
                                    className='mt-3 w-50' onClick={onSubmit}>proceed</CButton>
                            </div>
                        </CCard>
                    </Col>
                </Row>
            ) : (
                    <React.Fragment>
                        {(() => {
                            console.log(paymentMethod);
                            switch (paymentMethod) {
                                case 'card':
                                    switch (true) {
                                        case loading:
                                            return <Spinner />;
                                        case !error:
                                            return (
                                                options.clientSecret && (<Elements stripe={stripePromise} options={options}>
                                                        <Sample />
                                                    </Elements>)
                                            );
                                        default:
                                            return (
                                                <Row className="justify-content-center mt-5 pt-5">
                                                    <Col className="col-4 text-center mt-5">
                                                        <BiErrorCircle className="flex-shrink-0 me-2 mt-5" size={100} color='red' />
                                                    </Col>
                                                    <Col className="col-12 text-center mt-3">
                                                        <div style={{ 'fontSize': '18px' }}>Payment Failed</div>
                                                    </Col>
                                                </Row>
                                            );
                                    }
                                case 'cash':
                                    switch (true) {
                                        case loading:
                                            return <Spinner />;
                                        case !error:
                                            return (
                                                options && (
                                                    < Navigate to='/orders' />
                                                )
                                            );
                                        default:
                                            return (
                                                <Row className="justify-content-center mt-5 pt-5">
                                                    <Col className="col-4 text-center mt-5">
                                                        <BiErrorCircle className="flex-shrink-0 me-2 mt-5" size={100} color='red' />
                                                    </Col>
                                                    <Col className="col-12 text-center mt-3">
                                                        <div style={{ 'fontSize': '18px' }}>Payment Failed</div>
                                                    </Col>
                                                </Row>
                                            );
                                    }
                                default:
                                    // Render default components if payment method is neither card nor cash
                                    return (
                                        <div>
                                            <h1>Invalide Payment Method</h1>
                                        </div>
                                    );
                            }
                        })()}
                    </React.Fragment>
            )}
        </Container>
    );


}

export default CheckOut;