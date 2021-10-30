import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment';

import { selectPreviewAgent } from '../../redux/agent/agent.selectors';
import { getOrganization } from '../../redux/organization/organization.actions';
import { selectCurrentOrganization } from '../../redux/organization/organization.selectors';

import ProfileIcon from '../../assets/profile.png';
import OrganizationIcon from '../../assets/organization.png';

const AgentPreview = (props) => {
  const { agent, organization, getOrganization } = props;
  const { id, name, createdAt, orgId } = agent;

  useEffect(() => {
    getOrganization(orgId);
  }, []);

  return (
    <div className='agent-preview'>
      <div>
        <div>
          <div>
            <img src={ProfileIcon} alt='Profile Icon' />
          </div>
        </div>
        <div>
          <div>
            <div className='agent-status'>
              <span>{`Active Agent`}</span>
            </div>
            <div className='display-span'>
              <span>Agent ID</span>
              <span>{id}</span>
            </div>
            <div className='display-span'>
              <span>Name</span>
              <span>{name}</span>
            </div>
            <div className='org-info'>
              {organization != null ? (
                <>
                  <span>Organized By</span>
                  <div>
                    <img src={OrganizationIcon} alt='Organization Icon' />
                    <span>{organization.name}</span>
                  </div>
                </>
              ) : null}
            </div>
            <div className='display-span'>
              <span>Created At</span>
              <span>{Moment.utc(createdAt).local().format('MMMM, DD YYYY HH:mm')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  agent: selectPreviewAgent(ownProps.match.params.agentId)(state),
  organization: selectCurrentOrganization(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOrganization: (organizationId) => dispatch(getOrganization(organizationId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AgentPreview));
