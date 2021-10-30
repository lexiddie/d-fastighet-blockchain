import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Overview from './overview.component';
import Preview from '../../components/organization-preview/organization-preview.component';

import { fetchOrganizationsStart } from '../../redux/organization/organization.actions';

import { selectOrgId } from '../../redux/authentication/authentication.selectors';

import { getOrganization } from '../../redux/organization/organization.actions';
import { selectCurrentOrganization } from '../../redux/organization/organization.selectors';

const Organization = (props) => {
  const { match, fetchOrganizationsStart, accountOrgId, getOrganization, organization } = props;

  useEffect(() => {
    fetchOrganizationsStart();
    getOrganization(accountOrgId);
  }, []);
  return (
    <div className='organization'>
      <div className='organization-page'>
        <div className='org-status'>
          {organization != null ? (
            <>
              <span>{`Welcome back to ${organization.name}`}</span>
            </>
          ) : null}
        </div>
        <Route exact path={`${match.path}`} component={Overview} />
        <Route path={`${match.path}/:organizationId`} component={Preview} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  accountOrgId: selectOrgId,
  organization: selectCurrentOrganization
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrganizationsStart: () => dispatch(fetchOrganizationsStart()),
  getOrganization: (organizationId) => dispatch(getOrganization(organizationId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Organization));
