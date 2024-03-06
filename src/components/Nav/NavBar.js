import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Navitems } from '../../utils/NavUtils';
import './NavBar.css'

const CNavBar = () => {

    return (

        <Navbar expand="lg" className="bg-dark navbar-dark" fixed='top' >
            <Container>
                <Navbar.Brand href="#"><Link to="/" className="link-no-decoration">Mfooda</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className='navbar-collapse' id="responsive-navbar-nav">
                    <Container >

                        <Nav className='justify-content-end'>
                            {
                                Navitems.map((index) => (
                                    <Nav.Link className='px-5' key={index.id}><FontAwesomeIcon icon={index.icon} className='px-1' />

                                        <Link className="link-no-decoration" to={index.link} >{index.name}</Link>


                                    </Nav.Link>
                                ))
                            }
                        </Nav>
                    </Container>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );


}

export default CNavBar;