import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Overview from './overview.component';
import Preview from '../../components/agent-preview/agent-preview.component';

import { fetchAgentsStart } from '../../redux/agent/agent.actions';

import { selectOrgId } from '../../redux/authentication/authentication.selectors';

import { getOrganization } from '../../redux/organization/organization.actions';
import { selectCurrentOrganization } from '../../redux/organization/organization.selectors';

const Agent = (props) => {
  const { match, fetchAgentsStart, accountOrgId, getOrganization, organization } = props;

  useEffect(() => {
    fetchAgentsStart();
    getOrganization(accountOrgId);
  }, []);
  return (
    <div className='agent'>
      <div className='agent-page'>
        <div className='org-status'>
          {organization != null ? (
            <>
              <span>{`Welcome back to ${organization.name}`}</span>
            </>
          ) : null}
        </div>
        <Route exact path={`${match.path}`} component={Overview} />
        <Route path={`${match.path}/:agentId`} component={Preview} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  accountOrgId: selectOrgId,
  organization: selectCurrentOrganization
});

const mapDispatchToProps = (dispatch) => ({
  fetchAgentsStart: () => dispatch(fetchAgentsStart()),
  getOrganization: (organizationId) => dispatch(getOrganization(organizationId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Agent));
