import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { store } from '../../redux/store';
import { getOrganization } from '../../redux/organization/organization.utils';

import BuildingIcon from '../../assets/building.png';

import { selectOrgId } from '../../redux/authentication/authentication.selectors';

const TransactionItem = ({ item, previewItem, accountOrgId }) => {
  const { name, orgId } = item;

  const state = store.getState();
  const organizations = state.organization.organizations;
  const organization = getOrganization(orgId, organizations);
  return (
    <div className='transaction-item' onClick={() => (accountOrgId === orgId ? previewItem(item.id) : null)}>
      <img className='transaction-photo' src={BuildingIcon} alt='Transaction Profile' />
      <div className='transaction-footer'>
        <span className='name'>{name}</span>
      </div>
      <div className={`status ${accountOrgId !== orgId ? 'active' : ''}`}>{organization != null ? <span>{organization.name}</span> : null}</div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  accountOrgId: selectOrgId
});

export default connect(mapStateToProps)(TransactionItem);
