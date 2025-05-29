import React from 'react';
import { Container, Row, Col, Card, Breadcrumb, Table, Pagination, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MainContent = (props) => {
  const { isDesktopSidebarCollapsed, isMobileView } = props;

  // Dynamic style for main content area based on sidebar state and view
  const mainContentStyle = {
    paddingTop: '20px', // Initial padding from top
    paddingBottom: '20px', // Padding at the bottom
    paddingLeft: '20px', // Padding on the sides
    paddingRight: '20px', // Padding on the sides
    backgroundColor: '#f8f9fa', // A light background for the content area
    flexGrow: 1, // Ensure it takes up available space
    transition: 'margin-left 0.3s ease-in-out',
    marginLeft: isMobileView ? '0' : (isDesktopSidebarCollapsed ? '0' : '280px'),
    // Header height consideration: If header is fixed and has known height, add paddingTop here or ensure header doesn't overlap
    // For now, assuming header is part of the scrollable content or its height is handled by contentWrapper in App.js
    minHeight: 'calc(100vh - 70px)', // Assuming header is roughly 70px. Adjust as needed.
    overflowY: 'auto', // Allow content to scroll
  };

  return (
    // The className "main-content-area" can be used for App.css styling if needed
    <main className="main-content-area" style={mainContentStyle}>
      <Container fluid>
        {/* Breadcrumb and Title */}
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={6}>
            <h1 className="h3 mb-0 text-dark">Dashboard</h1> {/* Added text-dark for better visibility */}
          </Col>
          <Col xs={12} md={6}>
            <Breadcrumb className="float-md-end">
              <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row>
          <Col md={6} xl={3} className="mb-3">
            <Card className="border-start border-primary border-4 shadow-sm"> {/* Added shadow-sm */}
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="text-muted small text-uppercase">Sales</div>
                    <h3 className="mb-0">2.382</h3>
                  </div>
                  <div className="ms-3">
                    <i className="bi bi-cart fs-2 text-primary"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={3} className="mb-3">
            <Card className="border-start border-warning border-4 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="text-muted small text-uppercase">Visitors</div>
                    <h3 className="mb-0">14.212</h3>
                  </div>
                  <div className="ms-3">
                    <i className="bi bi-people fs-2 text-warning"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={3} className="mb-3">
            <Card className="border-start border-success border-4 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="text-muted small text-uppercase">Earnings</div>
                    <h3 className="mb-0">$21.300</h3>
                  </div>
                  <div className="ms-3">
                    <i className="bi bi-currency-dollar fs-2 text-success"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={3} className="mb-3">
            <Card className="border-start border-info border-4 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className="text-muted small text-uppercase">Orders</div>
                    <h3 className="mb-0">64</h3>
                  </div>
                  <div className="ms-3">
                    <i className="bi bi-box-seam fs-2 text-info"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts Row - Placeholder for charts */}
        <Row>
          <Col lg={7} className="mb-3 d-flex">
            <Card className="flex-fill w-100 shadow-sm">
              <Card.Header>
                <Card.Title as="h5" className="mb-0">Sales / Revenue</Card.Title>
              </Card.Header>
              <Card.Body className="d-flex w-100">
                <div className="w-100 bg-light d-flex justify-content-center align-items-center" style={{height: '300px'}}>Placeholder for Chart</div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5} className="mb-3 d-flex">
            <Card className="flex-fill w-100 shadow-sm">
              <Card.Header>
                <Card.Title as="h5" className="mb-0">Daily feed</Card.Title>
              </Card.Header>
              <Card.Body style={{maxHeight: '300px', overflowY: 'auto'}}> {/* Scrollable feed */}
                <div className="d-flex align-items-start mb-3">
                  <img src="https://via.placeholder.com/36/007bff/ffffff?text=VT" width="36" height="36" className="rounded-circle me-2" alt="Vanessa Tucker" />
                  <div>
                    <strong>Vanessa Tucker</strong> started following <strong>Christina Mason</strong><br />
                    <small className="text-muted">5m ago</small>
                  </div>
                </div>
                 <div className="d-flex align-items-start mb-3">
                  <img src="https://via.placeholder.com/36/28a745/ffffff?text=JP" width="36" height="36" className="rounded-circle me-2" alt="James P." />
                  <div>
                    <strong>James P.</strong> posted a new blog article: <strong>"React Best Practices 2024"</strong><br />
                    <small className="text-muted">32m ago</small>
                  </div>
                </div>
                 <div className="d-flex align-items-start mb-3">
                  <img src="https://via.placeholder.com/36/ffc107/000000?text=SC" width="36" height="36" className="rounded-circle me-2" alt="Sara C." />
                  <div>
                    <strong>Sara C.</strong> commented on your post: <strong>"Dashboard UI Update"</strong><br />
                    <small className="text-muted">1h ago</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Latest Projects Table */}
        <Row>
          <Col xs={12} className="mb-3">
            <Card className="shadow-sm">
              <Card.Header>
                <Card.Title as="h5">Latest Projects</Card.Title>
                <Card.Subtitle className="text-muted small">Most recent projects</Card.Subtitle>
              </Card.Header>
              <Table striped responsive hover> {/* Added hover effect */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Assignee</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Project Apollo</td>
                    <td>Vanessa Tucker</td>
                    <td>01/01/2024</td>
                    <td>31/06/2024</td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td>
                      <ButtonGroup size="sm">
                        <Button variant="outline-primary"><i className="bi bi-pencil-square"></i></Button>
                        <Button variant="outline-danger"><i className="bi bi-trash"></i></Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Project Zeus</td>
                    <td>John Doe</td>
                    <td>15/02/2024</td>
                    <td>15/08/2024</td>
                    <td><span className="badge bg-warning text-dark">In Progress</span></td>
                    <td>
                      <ButtonGroup size="sm">
                        <Button variant="outline-primary"><i className="bi bi-pencil-square"></i></Button>
                        <Button variant="outline-danger"><i className="bi bi-trash"></i></Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                   <tr>
                    <td>3</td>
                    <td>Project Athena</td>
                    <td>Alice Smith</td>
                    <td>01/03/2024</td>
                    <td>30/09/2024</td>
                    <td><span className="badge bg-info">Planning</span></td>
                    <td>
                      <ButtonGroup size="sm">
                        <Button variant="outline-primary"><i className="bi bi-pencil-square"></i></Button>
                        <Button variant="outline-danger"><i className="bi bi-trash"></i></Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Card.Footer className="d-flex justify-content-end">
                <Pagination>
                  <Pagination.Prev />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Next />
                </Pagination>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MainContent;
