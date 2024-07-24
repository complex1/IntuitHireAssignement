
// write a test for the App component that checks if the App component renders a div with the class name App-header
import React from 'react';
import { render, test } from '@testing-library/react'; // Add 'test' to the import statement
import { expect } from '@testing-library/jest-dom'; // Add this line
import App from '../src/App';

test('renders a div with the class name App-header', () => {
  const { container } = render(<App />);
  const header = container.querySelector('.App-header');
  expect(header).toBeInTheDocument();
});
