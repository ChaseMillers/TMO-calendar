
import CompleteCalendar from '../CompleteCalendar/CompleteCalendar'
import { withOktaAuth } from "@okta/okta-react";

export default withOktaAuth(({oktaAuth, authState, startDate}) => {

  // if(!authState?.isAuthenticated) {
  //   login();
  // }

  // if(!authState?.isAuthenticated) {
  //   oktaAuth.signInWithRedirect();
  // }

  async function login() {
    await oktaAuth.signInWithRedirect();
  }
    
  return (
    <CompleteCalendar />
  );

});