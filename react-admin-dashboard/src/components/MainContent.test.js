import { render, screen } from '@testing-library/react';
import MainContent from './MainContent';

// Mock CSS imports
jest.mock('bootstrap-icons/font/bootstrap-icons.css', () => ({}));

// Mock react-bootstrap components
jest.mock('react-bootstrap/Container', () => (props) => <div data-testid="container">{props.children}</div>);
jest.mock('react-bootstrap/Row', () => (props) => <div data-testid="row">{props.children}</div>);
jest.mock('react-bootstrap/Col', () => (props) => <div data-testid="col">{props.children}</div>);
jest.mock('react-bootstrap/Card', () => ({
    Body: (props) => <div data-testid="card-body">{props.children}</div>,
    Header: (props) => <div data-testid="card-header">{props.children}</div>,
    Footer: (props) => <div data-testid="card-footer">{props.children}</div>,
    Title: (props) => <h5 data-testid="card-title">{props.children}</h5>,
    Subtitle: (props) => <h6 data-testid="card-subtitle">{props.children}</h6>,
    ...(props) => <div data-testid="card">{props.children}</div>
}));
jest.mock('react-bootstrap/Breadcrumb', () => ({
    Item: (props) => <li data-testid="breadcrumb-item">{props.children}</li>,
    ...(props) => <ol data-testid="breadcrumb">{props.children}</ol>
}));
jest.mock('react-bootstrap/Table', () => (props) => <table data-testid="table">{props.children}</table>);
jest.mock('react-bootstrap/Pagination', () => (props) => <ul data-testid="pagination">{props.children}</ul>); // Basic mock

describe('MainContent Component', () => {
  const defaultProps = {
    isDesktopSidebarCollapsed: false,
    isMobileView: false,
  };

  test('renders without crashing', () => {
    render(<MainContent {...defaultProps} />);
  });

  test('renders the main dashboard heading', () => {
    render(<MainContent {...defaultProps} />);
    // The heading "Dashboard" is an h1 with class h3.
    // We can find it by its role and text.
    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument();
  });

  test('renders one of the stat cards (e.g., Sales card)', () => {
    render(<MainContent {...defaultProps} />);
    // Each card has a title like "Sales", "Visitors", etc.
    // These titles are within a div with class "text-muted small text-uppercase"
    expect(screen.getByText('Sales')).toBeInTheDocument();
    // Check for the value as well to be more specific
    expect(screen.getByText('2.382')).toBeInTheDocument();
  });

  test('renders the "Sales / Revenue" card title', () => {
    render(<MainContent {...defaultProps} />);
    // This is a Card.Title, which we mocked as h5 with data-testid="card-title"
    // We can look for the text "Sales / Revenue".
    const cardTitles = screen.getAllByTestId('card-title');
    const salesRevenueTitle = cardTitles.find(title => title.textContent === 'Sales / Revenue');
    expect(salesRevenueTitle).toBeInTheDocument();
  });
  
  test('renders "Latest Projects" table title', () => {
    render(<MainContent {...defaultProps} />);
    // This is also a Card.Title.
    const cardTitles = screen.getAllByTestId('card-title');
    const latestProjectsTitle = cardTitles.find(title => title.textContent === 'Latest Projects');
    expect(latestProjectsTitle).toBeInTheDocument();
  });
});
