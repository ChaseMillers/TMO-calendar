import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import dummyData from './dummyData.json'
import axios from 'axios';

import './defaultCalendar.css';
import './AddedCalendar.css'
import './attachment-gui.css'


function App() {
  const [data, setData] = useState();

  const [date, setDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(new Set())
  const [userDates, setUserDates] = useState()
  const [fetchData, triggerFetch] = useState(false)

  const URL = process.env.REACT_APP_API_ENDPOINT
  // Fetch Data
  useEffect(() => {

    const getNamesData = () => {
    axios.get(URL).then(response => {
      setData(`reponse: ${response.data}`);
      // convert stored days array into hash set 0(1), use object.has to avoid looping.
      setUserDates(new Set(response.data.user.daysInOffice))
    })
    .catch(error => {
      console.log(error);
    })
  };
  // getNamesData();

  setData(dummyData)
  setUserDates(new Set(dummyData.user.daysInOffice) )

  }, [URL]);

  
  const handleClass = ({ date, view }) => {
    // console.log(userDates, selectedDates)
   
    if(selectedDates 
      && selectedDates.has(moment(date).format("MM/DD/YYYY")) 
      && userDates 
      && userDates.has(moment(date).format("MM/DD/YYYY"))){
      return 'react-calendar__tile-special selectedInOffice'
     }

    if(selectedDates && selectedDates.has(moment(date).format("MM/DD/YYYY"))){
      return 'react-calendar__tile-special'
     }
   
    else if (userDates && userDates.has(moment(date).format("MM/DD/YYYY"))){
      return 'selectedInOffice'
    }
  }

  const handleAdd = async () =>{
    const datesData = []

    try{
      axios.post(URL, datesData).then(response => triggerFetch(!fetchData))
      .catch(error => {
        console.log(error);
      });
    } catch (error){
      console.log(error)
    }

  }
  const handleRemove = async () =>{
    const datesData = []

    try{
      axios.post(URL, datesData).then(response => triggerFetch(!fetchData))
      .catch(error => {
        console.log(error);
      });
    } catch (error){
      console.log(error)
    }
  }

  const handleSelect =(e)=>{
    setDate(new Date(e))

    // moment(date).format("MM/DD/YYYY"))
    const hashMapSet = moment(new Date(e)).format("MM/DD/YYYY")
    
    if(selectedDates.has(hashMapSet) === false){
      selectedDates.add(hashMapSet) 
    }
    else{
      selectedDates.delete(hashMapSet)
    }
    
  }

  return (
    <div className='app'>
      <h1 className='text-center'>In Office Planner</h1>
      <div className='calendar-container'>

        <Calendar 
          onChange={handleSelect} 
          value={date} 
          tileClassName = {handleClass}
          tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6 }
        />
        <div className='buttons-gui'>
          <h2 className='office-days-text'>Office Days</h2>
          <button className='add-btn' onClick={()=> handleAdd()}>Add</button>
          <button className='remove-btn' onClick={()=> handleAdd()}>Remove</button>
        </div>
      
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date: </span>
        {date.toDateString()}
      </p>
    </div>
  );
}

export default App;