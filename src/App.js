/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Calendar from 'react-calendar';
import './defaultCalendar.css';
import moment from 'moment';
import './AddedCalendar.css'
import dummyData from './dummyData.json'
import axios from 'axios';
import { LoginCallback, Security, withOktaAuth } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Profile from './Profile'

const oktaAuth = new OktaAuth({
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: '/login/callback',
  scopes: ['openid', 'profile']
});

const MainScreen = withOktaAuth(({ oktaAuth, authState }) => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState()
  const [userDates, setUserDates] = useState()

  const name = ({ date, view }) => {
  
    if(userDates && userDates.has(moment(date).format("MM/DD/YYYY"))){
     return 'selectedInOffice'
    }
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