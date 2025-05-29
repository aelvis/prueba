import { render, screen } from '@testing-library/react';
import App from './App.jsx';

// Mock child components to isolate App.js tests and avoid deep rendering issues
jest.mock('./components/Sidebar.jsx', () => () => <aside data-testid="sidebar">Mock Sidebar</aside>);
jest.mock('./components/Header.jsx', () => () => <header data-testid="header">Mock Header</header>);
jest.mock('./components/MainContent.jsx', () => () => <main data-testid="main-content">Mock MainContent</main>);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders Sidebar component', () => {
    render(<App />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText('Mock Sidebar')).toBeInTheDocument();
  });

  test('renders Header component', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Mock Header')).toBeInTheDocument();
  });

  test('renders MainContent component', () => {
    render(<App />);
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByText('Mock MainContent')).toBeInTheDocument();
  });
});
