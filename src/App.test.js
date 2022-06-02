import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { error } from "console";

test('Loads The Calendar', () => {
  render(<App />);
  const calendarElement = screen.getByText("Mon");
  expect(calendarElement).toBeInTheDocument();
});


test('User can toggle selected days.', () => {
  render(<App />);

  // Select the 10th of the current month.
  const dateTile = screen.getByRole('button', {name :/10/i})
  console.log("HERE" + dateTile)
  fireEvent.click(dateTile)

  // Check if date tile is selected with correct selection class.
  console.log(dateTile.className)
  expect(dateTile.className).toBe('react-calendar__tile react-calendar__tile--active react-calendar__tile--range react-calendar__tile--rangeStart react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds react-calendar__month-view__days__day react-calendar__tile-special')
});




// Use screen.debug() when needed
// Great video on aysnc mocking https://www.youtube.com/watch?v=TBZy-Rc-xX0
