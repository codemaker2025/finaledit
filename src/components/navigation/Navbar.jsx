import { Navbar, Nav, Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

export default function NavbarComponent() {
  const { auth, customLogout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
      <div className="container">
        <Navbar.Brand href="/">Welcome</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            
            
            {auth && (
              <Nav.Item>
                <Button
                  variant="danger"
                  onClick={customLogout}
                  className="p-2"
                >
                  Logout
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
