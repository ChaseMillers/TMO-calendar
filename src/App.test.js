import { render, screen, fireEvent } from '@testing-library/react';
import CompleteCalendar from './components/CompleteCalendar/CompleteCalendar.js'
import { UserContextProvider } from './userContext';

test('The Calendar loads every day of the week', () => {
  render(
    <UserContextProvider>
      <CompleteCalendar />
    </UserContextProvider>
  );
  const calendarElementMon = screen.getByText("Mon");
  expect(calendarElementMon).toBeInTheDocument();
  const calendarElementSun = screen.getByText("Sun");
  expect(calendarElementSun).toBeInTheDocument();
});
test('The add and remove buttons are rendered', () => {
  render(
    <UserContextProvider>
      <CompleteCalendar />
    </UserContextProvider>
  );
  const addBtn = screen.getByRole('button', {name :'Add'});
  expect(addBtn).toBeInTheDocument();
  const removeBtn = screen.getByRole('button', {name :'Remove'});
  expect(removeBtn).toBeInTheDocument();
});
test('The Key Color component is rendered', () => {
  render(
    <UserContextProvider>
      <CompleteCalendar />
    </UserContextProvider>
  );
  const keyColor = screen.getByText("Color Key");
  expect(keyColor).toBeInTheDocument();
});

test('User can toggle selected days.', () => {
  render(
    <UserContextProvider>
      <CompleteCalendar />
    </UserContextProvider>
  );

  // Select the 10th of the current month.
  const dateTile = screen.getByRole('button', {name :/10/i})
  fireEvent.click(dateTile)

  // Check if date tile is selected with correct selection class.
  expect(dateTile.className).toBe("react-calendar__tile react-calendar__tile--now react-calendar__tile--active react-calendar__tile--range react-calendar__tile--rangeStart react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds react-calendar__month-view__days__day react-calendar__tile-special")

  fireEvent.click(dateTile) // Check that the same tile had been toggled off.
  expect(dateTile.className).toBe("react-calendar__tile react-calendar__tile--now react-calendar__tile--active react-calendar__tile--range react-calendar__tile--rangeStart react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds react-calendar__month-view__days__day")
});

test('User can see team selected days.', async () => {
  const mockedDate = new Date('Mon Jun 06 2022 10:48:19 GMT-0700 (Pacific Daylight Time)') // The calandar will always be set to this time so test never fails
  render(
    <UserContextProvider>
      <CompleteCalendar mockedDate={mockedDate} MOCK={true}/>
    </UserContextProvider>
  );

  // expect multiple team members to be on page.
  const teamMembers = await screen.findAllByTestId('team-mate')
  expect(teamMembers[0]).toBeInTheDocument();

});

// Use screen.debug() when needed
// Great video on aysnc mocking https://www.youtube.com/watch?v=TBZy-Rc-xX0
