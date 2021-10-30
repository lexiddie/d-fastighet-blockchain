import React from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../src/pages/home/home.component';
import SignIn from '../src/pages/sign-in/sign-in.component';

import { selectIsSignIn } from './redux/authentication/authentication.selectors';

import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/index.scss';

const App = (props) => {
  const { isSignIn } = props;
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/' render={() => (isSignIn ? <Redirect from='*' to='/home' /> : null)} />
        <Route path='/home' component={Home} />
        <Route path='/sign-in' component={SignIn} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignIn: selectIsSignIn
});

export default withRouter(connect(mapStateToProps)(App));
