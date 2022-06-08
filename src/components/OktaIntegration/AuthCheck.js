
import CompleteCalendar from '../CompleteCalendar/CompleteCalendar'
import { withOktaAuth } from "@okta/okta-react";
import Profile from './Profile'
import React from 'react';

export default withOktaAuth(({oktaAuth, authState }) => {

  if(!authState?.isAuthenticated) {
    oktaAuth.signInWithRedirect();
  }
    
  return (
    <React.Fragment>
      <Profile />
      <CompleteCalendar />
    </React.Fragment>
  );

});