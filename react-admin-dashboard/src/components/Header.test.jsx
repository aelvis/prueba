import { render, screen } from '@testing-library/react';
import Header from './Header.jsx';

// Mock CSS imports
jest.mock('bootstrap-icons/font/bootstrap-icons.css', () => ({}));

// Mock react-bootstrap components
jest.mock('react-bootstrap/Container', () => (props) => <div>{props.children}</div>);
jest.mock('react-bootstrap/Row', () => (props) => <div>{props.children}</div>);
jest.mock('react-bootstrap/Col', () => (props) => <div>{props.children}</div>);
jest.mock('react-bootstrap/Button', () => (props) => <button onClick={props.onClick}>{props.children}</button>);
jest.mock('react-bootstrap/Dropdown', () => ({
    Toggle: (props) => <div data-testid="dropdown-toggle">{props.children}</div>,
    Menu: (props) => <ul data-testid="dropdown-menu">{props.children}</ul>,
    Item: (props) => <li data-testid="dropdown-item">{props.children}</li>,
}));
jest.mock('react-bootstrap/Form', () => ({
    Control: (props) => <input type="text" placeholder={props.placeholder} aria-label={props['aria-label']} />
}));
jest.mock('react-bootstrap/InputGroup', () => ({
    Text: (props) => <span>{props.children}</span>,
    // A basic mock for InputGroup itself if needed, or just let Form.Control and Button render
    ...(props) => <div>{props.children}</div> 
}));
jest.mock('react-bootstrap/Nav', () => ({
    Item: (props) => <div data-testid="nav-item">{props.children}</div>,
    Link: (props) => <a href={props.href}>{props.children}</a>,
    ...(props) => <nav>{props.children}</nav>
}));


describe('Header Component', () => {
  const defaultProps = {
    toggleSidebar: jest.fn(),
  };

  test('renders without crashing', () => {
    render(<Header {...defaultProps} />);
  });

  test('renders the menu toggle button', () => {
    render(<Header {...defaultProps} />);
    // The button contains a material icon with text "menu"
    // We can find the button by role and then check its content.
    const menuButtons = screen.getAllByRole('button'); // Gets all buttons
    // Find the button that is for toggling the menu, it has a material icon 'menu'
    const toggleButton = menuButtons.find(button => button.querySelector('.material-icons')?.textContent === 'menu');
    expect(toggleButton).toBeInTheDocument();
  });

  test('renders the search input', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search for...')).toBeInTheDocument();
  });

  test('renders notification bell icon', () => {
    render(<Header {...defaultProps} />);
    // The bell icon is an <i> tag with class "bi-bell"
    const bellIcon = screen.getByRole('link', { name: /unread messages/i }); // Nav.Link renders as <a>
    expect(bellIcon).toBeInTheDocument();
    expect(bellIcon.querySelector('.bi-bell')).toBeInTheDocument();
  });

  test('renders user dropdown', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByTestId('dropdown-toggle')).toBeInTheDocument();
    expect(screen.getByText('mdo')).toBeInTheDocument(); // User name in dropdown
  });
});
