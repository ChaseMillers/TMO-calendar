import React, { useState, useEffect } from 'react';
import dummyData from './dummyData.json'
import axios from 'axios';
import CompleteCalendar from './components/CompleteCalendar/CompleteCalendar'
import './App.css'

function App() {
  const [data, setData] = useState();

  const [date, setDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(new Set())
  const [savedUserDates, setSavedUserDates] = useState()
  const [savedTeamData, setSavedTeamData] = useState()
  const [fetchData, triggerFetch] = useState(false)

  const URL = process.env.REACT_APP_API_ENDPOINT
  // Fetch Data
  useEffect(() => {

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
    // getNamesData();

    setData(dummyData)
    setSavedUserDates(new Set(dummyData.user.daysInOffice) )
    setSavedTeamData(dummyData.teamMembers) 
  }, [URL]);


  return (
    <div className='app'>
      <div className='absolute-container'>
        <h1 className='text-center'>In Office Planner</h1>
          <CompleteCalendar 
            setDate={setDate}
            date={date} 
            savedTeamData={savedTeamData}
            selectedDates={selectedDates}
            setSavedUserDates={setSavedUserDates}
            savedUserDates={savedUserDates}
            setSavedTeamData={setSavedTeamData}
            triggerFetch={triggerFetch}
            fetchData={fetchData}
          />
      </div>
    </div>
  );
}

export default App;