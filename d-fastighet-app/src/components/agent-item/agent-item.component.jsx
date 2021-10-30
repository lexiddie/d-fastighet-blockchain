import React from 'react';
import { connect } from 'react-redux';

import ProfileIcon from '../../assets/profile.png';

const AgentItem = ({ item, previewItem }) => {
  const { name } = item;
  return (
    <div className='agent-item' onClick={() => previewItem(item.id)}>
      <img className='agent-photo' src={ProfileIcon} alt='Agent Profile' />
      <div className='agent-footer'>
        <span className='name'>{name}</span>
      </div>
    </div>
  );
};

export default connect()(AgentItem);
