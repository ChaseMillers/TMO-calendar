
import CompleteCalendar from '../CompleteCalendar/CompleteCalendar'
import { withOktaAuth } from "@okta/okta-react";

export default withOktaAuth(({oktaAuth, authState }) => {

  if(!authState?.isAuthenticated) {
    oktaAuth.signInWithRedirect();
  }
    
  return (
    <CompleteCalendar />
  );

});