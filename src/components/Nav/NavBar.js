import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Navitems } from "../../utils/NavUtils";
import "./NavBar.css";

const MNavBar = () => {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark" id="navbar" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mfooda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="navbar-collapse" id="responsive-navbar-nav">
          <Container>
            <Nav className="justify-content-end">
              {Navitems.map((index) => (
                <Nav.Link
                  as={Link}
                  to={index.link}
                  className="px-5"
                  key={index.id}
                >
                  <FontAwesomeIcon icon={index.icon} className="px-1" />
                  {index.name}
                </Nav.Link>
              ))}
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MNavBar;
