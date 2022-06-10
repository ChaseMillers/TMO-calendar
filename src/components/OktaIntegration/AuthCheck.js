
import CompleteCalendar from '../CompleteCalendar/CompleteCalendar'
import { withOktaAuth } from "@okta/okta-react";
import Profile from './Profile'
import React from 'react';
import { UserContextProvider } from '../../userContext';

export default withOktaAuth(({oktaAuth, authState }) => {

  if(!authState?.isAuthenticated) {
    oktaAuth.signInWithRedirect();
  }
    
  return (
    <UserContextProvider>
      <Profile />
      <CompleteCalendar />
    </UserContextProvider>
  );

});