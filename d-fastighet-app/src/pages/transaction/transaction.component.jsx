import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import Overview from './overview.component';
import Preview from '../../components/transaction-preview/transaction-preview.component';

import { fetchTransactionsStart } from '../../redux/transaction/transaction.actions';

import { selectOrgId } from '../../redux/authentication/authentication.selectors';

import { getOrganization } from '../../redux/organization/organization.actions';
import { selectCurrentOrganization } from '../../redux/organization/organization.selectors';

const Transaction = (props) => {
  const { match, fetchTransactionsStart, accountOrgId, getOrganization, organization } = props;

  // const fetchData = () => {
  //   const headers = {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   };

  //   const request = axios
  //     .get('http://localhost:8080/api/properties', headers)
  //     .then(function (response) {
  //       /*() => {callback();}*/
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // Error
  //       if (error.response) {
  //         console.log(error.response.data);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         console.log(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log('Error', error.message);
  //       }
  //     });
  //   console.log(`Checking Request`, request);
  // };

  useEffect(() => {
    fetchTransactionsStart();
    getOrganization(accountOrgId);
  }, []);
  return (
    <div className='transaction'>
      <div className='transaction-page'>
        <div className='org-status'>
          {organization != null ? (
            <>
              <span>{`Welcome back to ${organization.name}`}</span>
            </>
          ) : null}
        </div>
        <Route exact path={`${match.path}`} component={Overview} />
        <Route path={`${match.path}/:transactionId`} component={Preview} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  accountOrgId: selectOrgId,
  organization: selectCurrentOrganization
});

const mapDispatchToProps = (dispatch) => ({
  fetchTransactionsStart: () => dispatch(fetchTransactionsStart()),
  getOrganization: (organizationId) => dispatch(getOrganization(organizationId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Transaction));
