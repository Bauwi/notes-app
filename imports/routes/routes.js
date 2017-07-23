import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session'

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id)
};
const onLeaveNotePage= () => {
  Session.set('selectedNoteId', undefined)
}
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const globalOnchange = (prevState, nextState) => {
  globalOnEnter(nextState)
}
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1]
  Session.set('currentPagePrivacy', lastRoute.privacy)
}
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnchange}>
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="/signup" privacy="unauth" component={Signup} />
      <Route path="/dashboard" privacy="auth" component={Dashboard} />
      <Route path="/dashboard/:id" privacy="auth" component={Dashboard} onEnter={onEnterNotePage}  onLeave={onLeaveNotePage}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
