import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    if (onLogin) {
      onLogin(email, password);
    } else {
      alert('Login form submitted (mock).\nEmail: ' + email + '\nPassword: ' + password + '\nActual login logic to be implemented in App.jsx.');
    }
  };

  return (
    <Container fluid className="p-0"> {/* Full width, no padding for the main container */}
      <Row className="g-0 min-vh-100"> {/* No gutters, ensure row takes at least full viewport height */}
        
        {/* Left Column: Image */}
        <Col md={6} lg={7} className="d-none d-md-block p-0"> {/* Hidden on xs/sm screens */}
          <img
            src="https://source.unsplash.com/random/1200x900?technology,office" // Changed query for variety
            alt="Login background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Cover the column
          />
        </Col>

        {/* Right Column: Login Form */}
        <Col 
          xs={12} md={6} lg={5} 
          className="d-flex flex-column justify-content-center align-items-center bg-light p-4 p-md-5" // Padding for form area
        >
          <Card className="shadow-lg border-0 rounded-3 w-100" style={{ maxWidth: '480px' }}> {/* Max width for the card */}
            <Card.Body className="p-4 p-sm-5">
              <div className="text-center mb-4">
                {/* Optional: Logo */}
                {/* <img src="/path-to-your-logo.png" alt="Logo" style={{width: '72px', marginBottom: '1rem'}} /> */}
                <h2 className="fw-bold mb-0">Admin Login</h2>
                <p className="text-muted">Access your dashboard</p>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email address or Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4 d-flex justify-content-between align-items-center">
                  <Form.Check type="checkbox" label="Remember me" id="rememberMeCheckbox" />
                  <a href="#!" className="small text-decoration-none">Forgot password?</a>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Login
                  </Button>
                </div>
              </Form>
              {/* Optional: Social Logins or Sign Up link */}
              {/* <div className="text-center mt-4">
                <p className="small">Don't have an account? <a href="#!">Sign up here</a></p>
              </div> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
