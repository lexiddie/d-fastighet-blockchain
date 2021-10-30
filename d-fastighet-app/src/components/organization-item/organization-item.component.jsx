import React from 'react';
import { connect } from 'react-redux';

import OrganizationIcon from '../../assets/organization.png';

const OrganizationItem = ({ item }) => {
  const { name } = item;
  return (
    <div className='organization-item'>
      <img className='organization-photo' src={OrganizationIcon} alt='Organization Profile' />
      <div className='organization-footer'>
        <span className='name'>{name}</span>
      </div>
    </div>
  );
};

export default connect()(OrganizationItem);
