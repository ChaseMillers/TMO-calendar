import React from 'react';
import { LoginCallback, Security } from "@okta/okta-react";
import './App.css'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import { withRouter } from 'react-router-dom';


const oktaAuth = new OktaAuth({
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + '/login/callback'
});

function App({ history }) {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path="/" exact={true} component={Home}/>
      <Route path="/login/callback" component={LoginCallback}/>
    </Security>
  );
};

const AppWithRouterAccess = withRouter(App);

const RouterApp = () => {
  return (
    <BrowserRouter>
      <AppWithRouterAccess />
    </BrowserRouter>
  );
}

export default RouterApp;
