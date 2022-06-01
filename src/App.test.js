import { render, screen } from '@testing-library/react';
import App from './App';

test('Loads The Calendar', () => {
  render(<App />);
  const calendarElement = screen.getByText("Mon");
  expect(calendarElement).toBeInTheDocument();
});
