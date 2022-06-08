
import CompleteCalendar from '../CompleteCalendar/CompleteCalendar'
import { withOktaAuth } from "@okta/okta-react";

export default withOktaAuth(({oktaAuth, authState, startDate}) => {

  if(!authState?.isAuthenticated) {
    login();
  }

  async function login() {
    await oktaAuth.signInWithRedirect();
  }
    
  return (
    <CompleteCalendar />
  );

});