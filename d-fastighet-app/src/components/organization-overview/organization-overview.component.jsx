import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import OrganizationItem from '../organization-item/organization-item.component';

import { selectOrganizations, selectSearchOrganizations, selectIsSearch } from '../../redux/organization/organization.selectors';

const OrganizationOverview = (props) => {
  const { history, isSearch, organizations, dOrganizations } = props;
  const previewItem = (organizationId) => {
    history.push(`/home/organization/${organizationId}`);
  };
  return (
    <div className='organization-overview'>
      <div>
        {isSearch
          ? dOrganizations.map((item) => <OrganizationItem key={item.id} item={item} previewItem={() => previewItem(item.id)} />)
          : organizations.map((item) => <OrganizationItem key={item.id} item={item} previewItem={() => previewItem(item.id)} />)}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  organizations: selectOrganizations,
  dOrganizations: selectSearchOrganizations,
  isSearch: selectIsSearch
});

export default withRouter(connect(mapStateToProps)(OrganizationOverview));
