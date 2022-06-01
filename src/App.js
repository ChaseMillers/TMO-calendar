import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './defaultCalendar.css';
import moment from 'moment';
import './AddedCalendar.css'
import dummyData from './dummyData.json'
import axios from 'axios';

function App() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState()
  const [userDates, setUserDates] = useState()


  const name = ({ date, view }) => {
  
    if(userDates && userDates.has(moment(date).format("MM/DD/YYYY"))){
     return 'selectedInOffice'
    }
  }

  return (
    <div className='app'>
      <h1 className='text-center'>In Office Planner</h1>
      <div className='calendar-container'>

        <Calendar 
          onChange={setDate} 
          value={date} 
        />
      
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default App;