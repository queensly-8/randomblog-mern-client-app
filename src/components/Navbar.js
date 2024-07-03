import { Button, Container, Nav } from "react-bootstrap"
import NavBar from 'react-bootstrap/NavBar'
import { Link } from "react-router-dom"
import '../index.css'
import im from '../../src/images/Random.png'

export default function Navbar(){
    return (
        <NavBar className="navbar" id="transparentbg">
        <Container >
          <NavBar.Brand href="#home">
            <img
              src={im}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </NavBar.Brand>
          <Nav className="navlink justify-content-center">
            <Link as={Nav.Link} className='nav-link' to="/login" >Login</Link>
            <Link as={Nav.Link} className='nav-link' to="/register">Register</Link>
          </Nav>
        </Container>
      </NavBar>
    )
}