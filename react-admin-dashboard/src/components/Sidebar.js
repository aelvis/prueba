import React, { useState } from 'react'; // Keep useState for submenus if not already handled
import { Nav, Collapse, Dropdown, Button } from 'react-bootstrap';
import { Link, NavLink as RouterNavLink } from 'react-router-dom'; // Import Link and NavLink
// Material Icons are linked in public/index.html

const Sidebar = (props) => {
  const { isMobileView, isOpen, isCollapsed, toggleSidebar, closeMobileSidebar } = props;

  // Submenu states - these were part of the component previously
  const [openPages, setOpenPages] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [openComponents, setOpenComponents] = useState(false);

  const sidebarClasses = `sidebar shadow-sm ${
    isMobileView ? (isOpen ? 'open' : '') : (isCollapsed ? 'collapsed' : '')
  }`;
  
  // Use inline style for dynamic width and fixed position as before
  // The margin-left for collapse/expand is handled by CSS classes now.
  const sidebarStyle = {
    width: '280px', // Fixed width
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: isMobileView ? (isOpen ? '0' : '-280px') : (isCollapsed ? '-280px' : '0'), // Slide in/out
    zIndex: 1020, // High z-index, ensure it's above overlay
    transition: 'left 0.3s ease-in-out', // Smooth transition for slide
    backgroundColor: '#111827', // Matching App.css .sidebar
    color: '#ffffff', // Matching App.css .sidebar
  };


  const navLinkStyle = { // General style for Nav.Link, applied via style prop
    cursor: 'pointer',
    color: '#9ca3af', 
    // other styles from App.css .sidebar .nav-link if needed directly
  };
  
  // activeClassName or activeStyle would be used with NavLink for dynamic active states
  // react-bootstrap's Nav.Link active prop might conflict or need careful handling
  // For simplicity, we can let react-router-dom's NavLink handle its own active state via a class.

  const iconRotationStyle = (isSubmenuOpen) => ({
    transform: isSubmenuOpen ? 'rotate(180deg)' : 'none',
    transition: 'transform 0.2s ease-in-out',
  });

  return (
    <aside className={sidebarClasses} style={sidebarStyle}>
      <div className="sidebar-header d-flex justify-content-between align-items-center px-3">
        <a href="#!" className="sidebar-logo text-white text-decoration-none">
          <i className="material-icons me-2 fs-4 align-middle">dashboard</i>
          <span className="fs-4 align-middle">Admin Dashboard</span>
        </a>
        {isMobileView && (
          <Button variant="dark" onClick={closeMobileSidebar} className="sidebar-close-btn d-md-none">
            <i className="material-icons">close</i>
          </Button>
        )}
      </div>
      <hr className="text-secondary" />
      <Nav variant="pills" className="flex-column mb-auto p-2 sidebar-nav"> {/* Added p-2 and custom class */}
        <Nav.Item>
          <Nav.Link as={RouterNavLink} to="/dashboard" style={navLinkStyle} className="d-flex align-items-center">
            <i className="material-icons me-2">speed</i>
            Dashboard
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link onClick={() => setOpenPages(!openPages)} aria-controls="pages-collapse" aria-expanded={openPages} style={navLinkStyle} className="d-flex align-items-center">
            <i className="material-icons me-2">article</i>
            Pages
            <i className="material-icons float-end ms-auto" style={iconRotationStyle(openPages)}>expand_more</i>
          </Nav.Link>
          <Collapse in={openPages}>
            <div id="pages-collapse" className="submenu">
              <Nav className="flex-column ms-3">
                <Nav.Item>
                  <Nav.Link as={Link} to="/profile" style={navLinkStyle} className="d-flex align-items-center">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/settings" style={navLinkStyle} className="d-flex align-items-center">Settings</Nav.Link>{/* Assuming a /settings route might exist */}
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/billing" style={navLinkStyle} className="d-flex align-items-center">Billing</Nav.Link>{/* Assuming a /billing route might exist */}
                </Nav.Item>
              </Nav>
            </div>
          </Collapse>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={() => setOpenAuth(!openAuth)} aria-controls="auth-collapse" aria-expanded={openAuth} style={navLinkStyle} className="d-flex align-items-center">
            <i className="material-icons me-2">shield</i>
            Authentication
            <i className="material-icons float-end ms-auto" style={iconRotationStyle(openAuth)}>expand_more</i>
          </Nav.Link>
          <Collapse in={openAuth}>
            <div id="auth-collapse" className="submenu">
              <Nav className="flex-column ms-3">
                {/* Example: these could also be Links if they are internal pages */}
                <Nav.Item><Nav.Link href="#!" style={navLinkStyle} className="d-flex align-items-center">Sign In</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="#!" style={navLinkStyle} className="d-flex align-items-center">Sign Up</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="#!" style={navLinkStyle} className="d-flex align-items-center">Forgot Password</Nav.Link></Nav.Item>
              </Nav>
            </div>
          </Collapse>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={() => setOpenComponents(!openComponents)} aria-controls="components-collapse" aria-expanded={openComponents} style={navLinkStyle} className="d-flex align-items-center">
            <i className="material-icons me-2">grid_view</i>
            Components
            <i className="material-icons float-end ms-auto" style={iconRotationStyle(openComponents)}>expand_more</i>
          </Nav.Link>
          <Collapse in={openComponents}>
            <div id="components-collapse" className="submenu">
              <Nav className="flex-column ms-3">
                <Nav.Item><Nav.Link href="#!" style={navLinkStyle} className="d-flex align-items-center">Alerts</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="#!" style={navLinkStyle} className="d-flex align-items-center">Buttons</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="#!" style={navLinkStyle} className="d-flex align-items-center">Cards</Nav.Link></Nav.Item>
              </Nav>
            </div>
          </Collapse>
        </Nav.Item>
        {/* Assuming these are not internal page routes for now, keep as href="#!" or update to 'to' if they become routes */}
        <Nav.Item><Nav.Link href="#!" style={navLinkStyle} className="d-flex align-items-center"><i className="material-icons me-2">bar_chart</i>Charts</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#!" style={navLinkStyle} className="d-flex align-items-center"><i className="material-icons me-2">table_rows</i>Tables</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="#!" style={navLinkStyle} className="d-flex align-items-center"><i className="material-icons me-2">info</i>About</Nav.Link></Nav.Item>
      </Nav>
      <hr className="text-secondary"/>
      <div className="p-3"> {/* Wrapper for dropdown for consistent padding */}
        <Dropdown>
          <Dropdown.Toggle as="a" href="#!" className="d-flex align-items-center text-white text-decoration-none" id="dropdownUser1">
            <img src="https://github.com/mdo.png" alt="user" width="32" height="32" className="rounded-circle me-2" />
            <strong>mdo</strong>
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark" className="text-small shadow" aria-labelledby="dropdownUser1">
            <Dropdown.Item as={Link} to="/profile">New project...</Dropdown.Item> {/* Example, might be different page */}
            <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item> {/* Assuming a /settings route */}
            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#!">Sign out</Dropdown.Item> {/* Sign out is usually not a Link */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </aside>
  );
};

export default Sidebar;
