import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { CAlert } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/reducers';
import { Navigate } from 'react-router-dom';

const Sample = () => {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentStatus,setPaymentStatus] = useState(false)

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/",
            },
            redirect: "if_required",

        });


        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            alert("payment success")
            dispatch(clearCart())
            setPaymentStatus(true)
            
        }
    };

    return (

        <div>
            {
                paymentStatus ? (

                    < Navigate to='/orders' />

                ) : (

                    <Container className="mt-5 pt-5">
                        <Row className="justify-content-center text-center">
                            <Col md={8}>
                                {errorMessage && <CAlert color="warning" dismissible onClose={() => { setErrorMessage(null) }}>{errorMessage}</CAlert>}
                                <Card>
                                    <Card.Body>
                                        <form >
                                            <PaymentElement />
                                            <Button disabled={!stripe} onClick={handleSubmit} className='mt-3'>Place Order</Button>
                                        </form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                )
            }
        </div>
        
    )
};

export default Sample;