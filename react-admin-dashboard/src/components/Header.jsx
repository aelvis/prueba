import React from 'react';
import { Container, Row, Col, Button, Dropdown, Form, InputGroup, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import 'bootstrap-icons/font/bootstrap-icons.css'; // For icons other than sidebar

const Header = (props) => {
  const { toggleSidebar, onLogout } = props; // Add onLogout to props

  // Adjusted style to remove fixed marginLeft, as this will be handled by a wrapper in App.js
  // or by classes on the content wrapper.
  const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1010, // Ensure it's above MainContent but below Sidebar and Overlay
    backgroundColor: '#111827', // Matching App.css .header
    color: '#ffffff', // Matching App.css .header
    padding: '0.5rem 1rem', // Adjust padding as needed
    // marginLeft will be handled by parent div's class in App.js
  };
  
  // const searchInputStyle = { // Removed as search bar is removed
  //   // width: '300px', // Can be responsive or fixed
  //   borderColor: '#374151', // from App.css
  //   backgroundColor: '#1f2937', // from App.css
  //   color: '#ffffff', // from App.css
  // };

  return (
    // The className "header" is from App.css for specific header styling if needed beyond react-bootstrap
    <header className="header shadow-sm" style={headerStyle}>
      <Container fluid>
        <Row className="align-items-center gx-2"> {/* gx-2 for gutter spacing */}
          {/* Sidebar Toggle and Search Bar */}
          <Col xs="auto" md={1}> {/* xs="auto" for toggle, md={1} to give it some space */}
            <Button variant="dark" onClick={toggleSidebar} className="btn-icon d-lg-none d-xl-none me-2"> {/* Show only on smaller screens if sidebar is collapsible */}
                 <i className="material-icons">menu</i> {/* Using Material Icon for menu toggle */}
            </Button>
             <Button variant="dark" onClick={toggleSidebar} className="btn-icon d-none d-lg-inline-block me-2"> {/* Show only on larger screens */}
                 <i className="material-icons">menu</i> {/* Using Material Icon for menu toggle */}
            </Button>
          </Col>
          {/* Search Bar Col removed */}

          {/* Header Icons and User Dropdown - aligned to the right */}
          <Col xs="auto" className="ms-auto"> {/* Explicitly xs="auto" and ms-auto to push to right */}
            <Nav className="flex-row align-items-center"> {/* Use flex-row for horizontal items */}
              <Nav.Item className="me-2">
                <Nav.Link href="#!" className="text-white position-relative btn-icon">
                  <i className="bi bi-bell fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge-custom">
                    9+
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="me-3"> {/* Increased margin for visual separation */}
                <Nav.Link href="#!" className="text-white position-relative btn-icon">
                  <i className="bi bi-chat-dots fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success notification-badge-custom">
                    3
                  </span>
                </Nav.Link>
              </Nav.Item>
            
              {/* User Dropdown */}
              <Dropdown as={Nav.Item} align="end" className="avatar-dropdown">
                <Dropdown.Toggle as="a" href="#!" className="d-flex align-items-center text-white text-decoration-none" id="dropdownUser2">
                  <img src="https://github.com/mdo.png" alt="user" width="32" height="32" className="rounded-circle me-2" />
                  <span className="d-none d-sm-inline-block">mdo</span>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark" className="text-small shadow"> {/* Applied variant="dark" for consistency if header is dark */}
                  <Dropdown.Item as={Link} to="/profile"><i className="material-icons">person_outline</i>New project...</Dropdown.Item> {/* Example, might be different page */}
                  <Dropdown.Item as={Link} to="/settings"><i className="material-icons">settings</i>Settings</Dropdown.Item> {/* Assuming a /settings route */}
                  <Dropdown.Item as={Link} to="/profile"><i className="material-icons">badge</i>Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout}><i className="material-icons">logout</i>Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
