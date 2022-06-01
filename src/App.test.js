import { render, screen } from '@testing-library/react';
import App from './App';

test('Loads The Calendar', () => {
  render(<App />);
  const calendarElement = screen.getByText("Mon");
  expect(calendarElement).toBeInTheDocument();
});


test('User can add a In-Office day to their calendar.', () => {
  render(<App />);

  // Select date.
  const dateTile = screen.getByRole('button', {name :'1'})
  fireEvent.click(dateTile)

  // Add date.
  const submitButton = screen.getByRole('button', {name :'Add'})
  fireEvent.click(dateTile)

  // Check if date background has changed Color.
  expect(submitButton.style.backgroundColor).toNotBe("white")
});
