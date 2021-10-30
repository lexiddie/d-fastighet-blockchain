import React from 'react';
import { connect } from 'react-redux';

import ProfileIcon from '../../assets/profile.png';

const CustomerItem = ({ item, previewItem }) => {
  const { name } = item;
  return (
    <div className='customer-item' onClick={() => previewItem(item.id)}>
      <img className='customer-photo' src={ProfileIcon} alt='Customer Profile' />
      <div className='customer-footer'>
        <span className='name'>{name}</span>
      </div>
    </div>
  );
};

export default connect()(CustomerItem);
