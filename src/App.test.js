import { render, screen, fireEvent } from '@testing-library/react';
import CompleteCalendar from './components/CompleteCalendar/CompleteCalendar.js'

test('The Calendar loads every day of the week', () => {
  render(
    <CompleteCalendar />
  );
  const calendarElementMon = screen.getByText("Mon");
  expect(calendarElementMon).toBeInTheDocument();
  const calendarElementSun = screen.getByText("Sun");
  expect(calendarElementSun).toBeInTheDocument();
});
test('The add and remove buttons are rendered', () => {
  render(
    <CompleteCalendar />
  );
  const addBtn = screen.getByRole('button', {name :'Add'});
  expect(addBtn).toBeInTheDocument();
  const removeBtn = screen.getByRole('button', {name :'Remove'});
  expect(removeBtn).toBeInTheDocument();
});
test('The Key Color component is rendered', () => {
  render(
    <CompleteCalendar />
  );
  const keyColor = screen.getByText("Color Key");
  expect(keyColor).toBeInTheDocument();
});

test('User can toggle selected days.', () => {
  render(
    <CompleteCalendar />
  );

  // Select the 10th of the current month.
  const dateTile = screen.getByRole('button', {name :/10/i})
  fireEvent.click(dateTile)

  // Check if date tile is selected with correct selection class.
  expect(dateTile.className).toBe('react-calendar__tile react-calendar__tile--active react-calendar__tile--range react-calendar__tile--rangeStart react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds react-calendar__month-view__days__day react-calendar__tile-special')

  fireEvent.click(dateTile) // Check that the same tile had been toggled off.
  expect(dateTile.className).toBe('react-calendar__tile react-calendar__tile--active react-calendar__tile--range react-calendar__tile--rangeStart react-calendar__tile--rangeEnd react-calendar__tile--rangeBothEnds react-calendar__month-view__days__day')
});

test('User can see team selected days.', async () => {
  const mockedDate = new Date('Mon Jun 06 2022 10:48:19 GMT-0700 (Pacific Daylight Time)') // The calandar will always be set to this time so test never fails
  render(
    <CompleteCalendar mockedDate={mockedDate}/>
  );

  // Mock jest triggered get for us.
  // Button content 'name' will hold the team users ID
  const teamMemberIcon = await screen.findByRole('button', {name :/cmiller200@t-mobile.com/i})
  
  expect(teamMemberIcon).toBeInTheDocument();
});

test(`If the user hasn't selected a day, when clicking add button, user will get a 'please select a day' pop up mesage`, async () => {
  const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
  render(
    <CompleteCalendar />
  );

  const addBtn = screen.getByRole('button', {name :'Add'});
  fireEvent.click(addBtn)
   expect(alertMock).toHaveBeenCalledTimes(1)
});


// Use screen.debug() when needed
// Great video on aysnc mocking https://www.youtube.com/watch?v=TBZy-Rc-xX0
