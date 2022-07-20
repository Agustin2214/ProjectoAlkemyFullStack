import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import style from './NavBarBalance.module.css'

export function NavBarBalance() {
const navigate = useNavigate()

function handleLogout(){
  localStorage.removeItem("user")
  navigate('/')
}



  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Alkemy challenge</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://www.alkemy.org/" target="_blank">Alkemy</Nav.Link>
            <Nav.Link href="https://drive.google.com/file/d/1xR92xRBg8uQDbdajch0sVb9xa4VtHXtU/view" target="_blank">Project</Nav.Link>
            <NavDropdown title="About me" id="collasible-nav-dropdown">
              <NavDropdown.Item href="https://www.linkedin.com/in/agustinibz/" target="_blank">Linkedin</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/Agustin2214" target="_blank">GitHub </NavDropdown.Item>
              <NavDropdown.Item href="http://agustinibanez.vercel.app" target="_blank">Porfolio</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://twitter.com/AgustinIbanez22" target="_blank">  Twitter </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link > <Button onClick={handleLogout} variant="outline-warning">Logout</Button>  </Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

