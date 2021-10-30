import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Overview from './overview.component';
import Preview from '../../components/customer-preview/customer-preview.component';

import { fetchCustomersStart } from '../../redux/customer/customer.actions';

import { selectOrgId } from '../../redux/authentication/authentication.selectors';

import { getOrganization } from '../../redux/organization/organization.actions';
import { selectCurrentOrganization } from '../../redux/organization/organization.selectors';

const Customer = (props) => {
  const { match, fetchCustomersStart, accountOrgId, getOrganization, organization } = props;

  useEffect(() => {
    fetchCustomersStart();
    getOrganization(accountOrgId);
  }, []);
  return (
    <div className='customer'>
      <div className='customer-page'>
        <div className='org-status'>
          {organization != null ? (
            <>
              <span>{`Welcome back to ${organization.name}`}</span>
            </>
          ) : null}
        </div>
        <Route exact path={`${match.path}`} component={Overview} />
        <Route path={`${match.path}/:customerId`} component={Preview} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  accountOrgId: selectOrgId,
  organization: selectCurrentOrganization
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomersStart: () => dispatch(fetchCustomersStart()),
  getOrganization: (organizationId) => dispatch(getOrganization(organizationId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Customer));
