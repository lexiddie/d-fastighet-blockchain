import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/header/header.component';

import Transaction from '../transaction/transaction.component';
import Organization from '../organization/organization.component';
import Agent from '../agent/agent.component';
import Customer from '../customer/customer.component';

import { selectIsSignIn } from '../../redux/authentication/authentication.selectors';

import { fetchAgentsStart } from '../../redux/agent/agent.actions';
import { fetchOrganizationsStart } from '../../redux/organization/organization.actions';
import { fetchCustomersStart } from '../../redux/customer/customer.actions';
import { fetchTransactionsStart } from '../../redux/transaction/transaction.actions';

import { firestore } from '../../firebase/firebase.utils';

const Home = (props) => {
  const { match, history, isSignIn, fetchAgentsStart, fetchOrganizationsStart, fetchCustomersStart, fetchTransactionsStart } = props;

  const sortObject = (data) => {
    const result = Object.keys(data)
      .sort()
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
    return result;
  };

  const checkSignIn = () => {
    if (!isSignIn) {
      history.push('/sign-in');
    }
  };

  useEffect(() => {
    checkSignIn();
    fetchAgentsStart();
    fetchOrganizationsStart();
    fetchCustomersStart();
    fetchTransactionsStart();
  }, [isSignIn]);

  return (
    <div className='home'>
      <Header />
      <Route path={`${match.path}/transaction`} component={Transaction} />
      <Route path={`${match.path}/organization`} component={Organization} />
      <Route path={`${match.path}/agent`} component={Agent} />
      <Route path={`${match.path}/customer`} component={Customer} />
      {match.isExact ? <Redirect to={`${match.path}/transaction`} /> : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isSignIn: selectIsSignIn
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomersStart: () => dispatch(fetchCustomersStart()),
  fetchAgentsStart: () => dispatch(fetchAgentsStart()),
  fetchOrganizationsStart: () => dispatch(fetchOrganizationsStart()),
  fetchTransactionsStart: () => dispatch(fetchTransactionsStart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
