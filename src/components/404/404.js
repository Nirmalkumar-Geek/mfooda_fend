import { Col, Container, Row } from "react-bootstrap"
import { TbError404 } from 'react-icons/tb';
import { useParams } from "react-router-dom";

const NotFound = () => {

    const { payment_intent } = useParams()

    return (

        <Container className="mt-5 pt-5">
            {console.log(payment_intent)}
            <Row className="justify-content-center mt-5 pt-5">
                <Col className="col-12 text-center mt-5">
                    <TbError404 className="flex-shrink-0 me-2" size={150} />
                </Col>
                <Col className="col-8 text-center mt-2">
                    <div style={{'fontSize':'18px'}}>Page Not Found </div>
                </Col>
            </Row>
        </Container>
    )

}

export default NotFound