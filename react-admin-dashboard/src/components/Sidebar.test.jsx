import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar.jsx';

// Mock react-bootstrap components that might cause issues in a shallow test
jest.mock('react-bootstrap/Nav', () => {
  const Nav = (props) => <nav>{props.children}</nav>;
  Nav.Item = (props) => <div>{props.children}</div>; // Mock Nav.Item
  Nav.Link = (props) => <a href={props.href} onClick={props.onClick} className={props.active ? 'active' : ''}>{props.children}</a>; // Mock Nav.Link
  return Nav;
});
jest.mock('react-bootstrap/Collapse', () => (props) => <div>{props.children}</div>);
jest.mock('react-bootstrap/Button', () => (props) => <button onClick={props.onClick} className={props.className}>{props.children}</button>);
jest.mock('react-bootstrap/Dropdown', () => {
  const Dropdown = (props) => <div data-testid="dropdown-wrapper">{props.children}</div>; // Mock for the main Dropdown wrapper
  Dropdown.Toggle = (props) => <div data-testid="dropdown-toggle">{props.children}</div>;
  Dropdown.Menu = (props) => <ul data-testid="dropdown-menu">{props.children}</ul>;
  Dropdown.Item = (props) => <li data-testid="dropdown-item">{props.children}</li>;
  Dropdown.Divider = () => <hr data-testid="dropdown-divider" />;
  return Dropdown;
});



describe('Sidebar Component', () => {
  const defaultProps = {
    isMobileView: false,
    isOpen: true,
    isCollapsed: false,
    toggleSidebar: jest.fn(),
    closeMobileSidebar: jest.fn(),
  };

  test('renders without crashing', () => {
    render(<Sidebar {...defaultProps} />);
  });

  test('renders the dashboard title/logo', () => {
    render(<Sidebar {...defaultProps} />);
    // The logo text "Admin Dashboard" is within a <span> inside an <a> tag.
    // We can look for the text directly.
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  test('renders the "Dashboard" nav link', () => {
    render(<Sidebar {...defaultProps} />);
    // The "Dashboard" Nav.Link is present.
    // We check for the text "Dashboard" which is part of a Nav.Link.
    // Since Nav.Link is mocked as <nav> containing children, we search for the text.
    // To be more specific, we can look for it within a link or button role if Nav.Link was mocked with those.
    // Given the current mock, simple text search should work.
    expect(screen.getByText((content, element) => {
        // Custom matcher to find "Dashboard" text specifically within what was a Nav.Link
        // This helps differentiate from other occurrences of "Dashboard" if any.
        return element.tagName.toLowerCase() === 'a' && content.startsWith('Dashboard');
      })).toBeInTheDocument();
  });

  test('renders user dropdown toggle', () => {
    render(<Sidebar {...defaultProps} />);
    expect(screen.getByTestId('dropdown-toggle')).toBeInTheDocument();
    expect(screen.getByText('mdo')).toBeInTheDocument(); // User name in the dropdown toggle
  });
  
  test('renders mobile close button when in mobile view and open', () => {
    render(<Sidebar {...defaultProps} isMobileView={true} isOpen={true} />);
    // The close button has a Material Icon "close"
    // It's a <Button> from react-bootstrap, which renders a <button>
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.querySelector('.material-icons').textContent).toBe('close');
  });

  test('does not render mobile close button on desktop view', () => {
    render(<Sidebar {...defaultProps} isMobileView={false} />);
    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });
});
