import React, { useState, useEffect } from 'react';
import dummyData from './dummyData.json'
import axios from 'axios';
import CompleteCalendar from './components/CompleteCalendar/CompleteCalendar'
import './App.css'
import moment from 'moment';

function App({startDate}) {
  const [data, setData] = useState();

  const [date, setDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(new Set())
  const [savedUserDates, setSavedUserDates] = useState()
  const [savedTeamData, setSavedTeamData] = useState()
  const [monthCount, setMonthCount] = useState(0)
  const [currentCalanderDate, setCurrentCalanderDate] = useState()

  const URL = process.env.REACT_APP_API_ENDPOINT
  const signedInUSerEmail = 'johnnybravo@t-mobile.com'

  // Fetch Data
  useEffect(() => {
    // console.log(new Date('2022-01-03T05:00:00.000+00:00'))

    const getURL = URL+moment(currentCalanderDate).format("YYYY/MM/")
    const getNamesData = () => {
      axios.get(URL).then(response => {
        setData(response.data);
        // convert stored days array into hash set 0(1), use set.has to avoid looping.
        setSavedUserDates(new Set(response.data.user.daysInOffice))
        setSavedTeamData(response.data.teamMembers) 
      })
      .catch(error => {
        console.log(error);
      })
    };

    setData(dummyData)
    setSavedUserDates(new Set(dummyData.user.daysInOffice) )
    setSavedTeamData(dummyData.teamMembers) 
  }, [URL, currentCalanderDate]);


  return (
    <div className='app'>
      <div className='absolute-container'>
        <h1 className='text-center'>In Office Planner</h1>
          <CompleteCalendar
            startDate={startDate}
            setDate={setDate}
            date={date} 
            savedTeamData={savedTeamData}
            selectedDates={selectedDates}
            setSavedUserDates={setSavedUserDates}
            savedUserDates={savedUserDates}
            setSavedTeamData={setSavedTeamData}
            monthCount={monthCount}
            setMonthCount={setMonthCount}
            setCurrentCalanderDate={setCurrentCalanderDate}
            currentCalanderDate={currentCalanderDate}
          />
      </div>
    </div>
  );
}

export default App;