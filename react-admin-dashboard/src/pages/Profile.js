import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = () => {
  return (
    <Container fluid className="p-4"> {/* Added padding similar to MainContent's eventual style */}
      <Row>
        <Col>
          <Card className="shadow-sm"> {/* Added shadow for consistency */}
            <Card.Body>
              <Card.Title as="h1" className="h3 mb-3">Profile Page</Card.Title> {/* Use as="h1" for semantics, styled as h3 */}
              <Card.Text>
                This is the user profile page. Content will be added here later.
                You can display user information, settings, activity logs, etc.
              </Card.Text>
              {/* Example of more structure if needed later */}
              <Row className="mt-4">
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title as="h5">User Details</Card.Title>
                      <Card.Text>Name: John Doe</Card.Text>
                      <Card.Text>Email: john.doe@example.com</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title as="h5">Account Settings</Card.Title>
                      <Card.Text>Update password, manage preferences...</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
