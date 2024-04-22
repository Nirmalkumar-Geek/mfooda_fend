import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';

const Search = () => {


    return (

        <Container className="mt-5">
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6} className="mt-4 text-center">
                    <Form.Control
                        className="w-100"
                        type="text"
                        placeholder="Search"
                        autoFocus
                    />
                </Col>
            </Row>
        </Container>


    );


}

export default Search;