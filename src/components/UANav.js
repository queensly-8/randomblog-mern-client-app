import { Navbar, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import logo from '../images/Random.png'

export default function InNav(){
    return(
          <Navbar className="navbar">
          <Container>
              <Navbar.Brand href="#home">
                  <img
                      src={logo}
                      width="100"
                      height="100"
                      className="d-inline-block align-top"
                      alt="React Bootstrap logo"
                  />
              </Navbar.Brand>
              <Navbar.Collapse className="justify-content-end">
                  <Link to="/logout">Logout</Link>
              </Navbar.Collapse>
          </Container>
          </Navbar>
    )
}