import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../index.css'
import im from '../../src/images/Random.png'

export default function Navbar(){
    return (
        <Navbar className="navbar" id="transparentbg">
        <Container >
          <Navbar.Brand href="#home">
            <img
              src={im}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="navlink justify-content-center">
            <Link as={Nav.Link} className='nav-link' to="/login" >Login</Link>
            <Link as={Nav.Link} className='nav-link' to="/register">Register</Link>
          </Nav>
        </Container>
      </Navbar>
    )
}