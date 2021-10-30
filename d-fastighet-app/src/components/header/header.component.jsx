import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../assets/galactic.png';

import { signOut } from '../../redux/authentication/authentication.actions';

const Header = (props) => {
  const { signOut, history } = props;

  const handleSignOut = () => {
    signOut();
    history.push('/sign-in');
  };

  return (
    <>
      <div className='header'>
        <NavLink className='logo-container' to='/home'>
          <img src={Logo} alt='Logo' />
        </NavLink>
        <div className='options'>
          <NavLink className='option' to='/home/transaction'>
            Transaction
          </NavLink>
          <NavLink className='option' to='/home/organization'>
            Organization
          </NavLink>
          <NavLink className='option' to='/home/agent'>
            Agent
          </NavLink>
          <NavLink className='option' to='/home/customer'>
            Customer
          </NavLink>
          <div className='option' onClick={handleSignOut}>
            Sign Out
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
