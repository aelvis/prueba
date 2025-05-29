import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const LoginPage = ({ onLogin }) => { // onLogin prop is for future use
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd call an authentication service here.
    // For this example, we'll just log and call the onLogin prop (if provided).
    console.log('Login attempt with:', { email, password });
    if (onLogin) {
      onLogin(email, password); // This will be connected later
    } else {
      // Placeholder action if onLogin is not yet wired up
      alert('Login form submitted (mock).\nEmail: ' + email + '\nPassword: ' + password + '\nActual login logic to be implemented in App.jsx.');
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100 justify-content-center"> {/* Ensure Row also centers its content if Col is not full width */}
        <Col xs={12} sm={10} md={8} lg={6} xl={4}> {/* Responsive column sizing */}
          <Card className="shadow-lg border-0 rounded-3"> {/* Enhanced styling */}
            <Card.Body className="p-4 p-sm-5"> {/* Responsive padding */}
              <div className="text-center mb-4">
                {/* You can add a logo here if you have one */}
                {/* <img src="/path-to-your-logo.png" alt="Logo" style={{width: '72px', marginBottom: '1rem'}} /> */}
                <h2 className="fw-bold mb-0">Admin Login</h2> {/* Changed to h2 for better semantics */}
                <p className="text-muted">Access your dashboard</p>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formBasicEmail"> {/* Increased margin */}
                  <Form.Label>Email address or Username</Form.Label>
                  <Form.Control
                    type="text" // Changed to text to allow username
                    placeholder="Enter email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="lg" // Larger input fields
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
                    size="lg" // Larger input fields
                  />
                </Form.Group>
                
                <Form.Group className="mb-4 d-flex justify-content-between align-items-center">
                  <Form.Check type="checkbox" label="Remember me" id="rememberMeCheckbox" />
                  <a href="#!" className="small text-decoration-none">Forgot password?</a>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg"> {/* Larger button */}
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
