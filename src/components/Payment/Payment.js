import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Spinner from './Spinner';
import axios from 'axios';
import Loader from './Loader';

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    const handleClick = async () => {
        setLoading(true);
        try {
            const response = await axios.post(process.env.REACT_APP_API_HOST + '/api/order/checkout', {
                // Add any payload if needed
            });
            const session = response.data;
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5 pt-5">
            <Row className="justify-content-center text-center">
                <Col md={8}>
                    <Form id="payment-form">
                        <Elements stripe={stripe}>
                            <Form.Group controlId="payment-element">
                                {/* PaymentElement component goes here */}
                            </Form.Group>
                        </Elements>
                        <Button className='mt-5 mb-3' disabled={!stripe || !elements} onClick={handleClick}>
                            <span id="button-text">Pay now</span>
                        </Button>
                    </Form>
                </Col>
            </Row>
            {loading && <Loader />}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Container>
    );
};

const stripePromise = loadStripe('pk_test_51OwXLZEvae3ml9CKX3jJjRSrCOL71loUjG2qRRv00bNLTII0WtfEdbwaMzKnadVkbAKJ7DrFUpuWKvV3aAxGcpw500bNSRXz80');

const Payment = () => (
    <Container className='mt-5'>
        <Card className='mt-5'>
            <Form>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </Form>
        </Card>
    </Container>
);

export default Payment;
