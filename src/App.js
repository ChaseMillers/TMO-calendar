/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import dummyData from './dummyData.json'
import axios from 'axios';
import { LoginCallback, Security, withOktaAuth } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Profile from './Profile'

import './DefaultCalendar.css';
import './AddedCalendar.css'
import './attachment-gui.css'

const oktaAuth = new OktaAuth({
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: '/login/callback',
  scopes: ['openid', 'profile']
});


const MainScreen = withOktaAuth(({ oktaAuth, authState }) => {

  const [data, setData] = useState();
  const [date, setDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(new Set())
  const [savedUserDates, setSavedUserDates] = useState()
  const [savedTeamData, setsavedTeamData] = useState()
  const [fetchData, triggerFetch] = useState(false)

  const URL = process.env.REACT_APP_API_ENDPOINT
  // Fetch Data
  useEffect(() => {

    const getNamesData = () => {
      axios.get(URL).then(response => {
        setData(response.data);
        // convert stored days array into hash set 0(1), use set.has to avoid looping.
        setSavedUserDates(new Set(response.data.user.daysInOffice))
        setsavedTeamData(response.data.teamMembers) 
      })
      .catch(error => {
        console.log(error);
      })
    };
    getNamesData();

    // setData(dummyData)
    // setSavedUserDates(new Set(dummyData.user.daysInOffice) )
    // setsavedTeamData(dummyData.teamMembers) 
  }, [URL]);

  
  const handleClass = ({ date, view }) => (
  
    selectedDates && savedUserDates // If data is part of user selection and saved selection, add both needed classes.
    && selectedDates.has(moment(date).format("MM/DD/YYYY")) 
    && savedUserDates.has(moment(date).format("MM/DD/YYYY"))
    
    ? 'react-calendar__tile-special selectedInOffice'
    : selectedDates && selectedDates.has(moment(date).format("MM/DD/YYYY"))
    
    ? 'react-calendar__tile-special'
    : savedUserDates && savedUserDates.has(moment(date).format("MM/DD/YYYY"))
    
    ? 'selectedInOffice'
    : null
    
  )

  const handleTeamDays = ({ date, view }) => (

    savedTeamData
    && savedTeamData.map((data, i) => (
      data.day.includes(moment(date).format("MM/DD/YYYY"))
      ? 
      <React.Fragment key={i}>
        <div className='hover-content'>
          <div className='in-office-container'>

            <h3>{date.toDateString()}</h3>
            <h4>In office list:</h4>
            <div className='in-office-list'>
              {data.members.map((member, i) => ( 
                <div key={i}> {member}</div> ))}
            </div>

          </div>
        </div>
        <div className='team-selected' key={i}>
          {data.members.length}
        </div>
      </React.Fragment> 
      : null
    )) 

  )

  const handleAdd = async () =>{
    const datesData = {}

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

    const fixedDate = moment(new Date(e)).format("MM/DD/YYYY")
    
    if(selectedDates.has(fixedDate) === false){
      selectedDates.add(fixedDate) 
    }
    else{
      selectedDates.delete(fixedDate)
    };
  }

  async function login() {
    await oktaAuth.signInWithRedirect();
  }

  async function logout() {
    await oktaAuth.signOut();
  }

  let buttons = null;
  if (authState?.isAuthenticated) {
    buttons = (
    <div className="Buttons">
      <button onClick={logout}>Logout</button>
      {/* Replace me with your root component. */}
    </div>
    );
  } 
  else {
    buttons = (
      <div className="Buttons">
        <button onClick={login}>Login</button>
      </div>
    );
  }
  
  return (
    <div className='mainScreen'>
      {buttons}
      <Profile></Profile>
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
      
              value={date} 
              tileClassName = {handleClass}
              tileContent = {handleTeamDays}
              tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6 }
            />
            <div className='buttons-gui'>
              <h2 className='office-days-text'>Office Days</h2>
              <button className='add-btn' onClick={()=> handleAdd()}>Add</button>
              <button className='remove-btn' onClick={()=> handleRemove()}>Remove</button>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
});

function App({ history }) {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='app'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Route path="/" exact={true} component={MainScreen}/>
            <Route path="/login/callback" component={LoginCallback}/>
      </Security>
    </div> 
  );
}

const AppWithRouterAccess = withRouter(App);

function RouterApp() {
  return (
    <Router><AppWithRouterAccess/></Router>
  );
}
export default RouterApp;