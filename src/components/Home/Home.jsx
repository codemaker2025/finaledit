import useAuth from "../../hooks/useAuth";
import LoginForm from "../Authentication/LoginForm";
import Dashboard from "./Dashboard";
import { Container, Row, Col } from "react-bootstrap";

// Main Home Component
function Home() {
  const { auth, customLogout, customLogin, loading, error } = useAuth();

  return (
    <Container fluid className="min-vh-100 d-flex flex-column justify-content-center bg-white text-dark">
      <Row className="justify-content-center">
        {auth ? (
          <Col md={6} className="text-center">
            <Dashboard logout={customLogout} />
          </Col>
        ) : (
          <Col md={6}>
            <LoginForm error={error} onLogin={customLogin} loading={loading} />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Home;
