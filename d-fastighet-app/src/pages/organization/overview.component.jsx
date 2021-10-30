import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Input } from 'reactstrap';

import OrganizationOverview from '../../components/organization-overview/organization-overview.component';
import { startSearch } from '../../redux/organization/organization.actions';

const Overview = (props) => {
  const { startSearch } = props;
  const onChangeSearch = (event) => {
    const { value } = event.target;
    startSearch(value);
  };

  useEffect(() => {
    startSearch('');
  }, []);
  return (
    <>
      <div className='organization-search'>
        <Input type='search' name='search' placeholder='Search' onChange={(e) => onChangeSearch(e)} />
      </div>
      <div className='organization-content'>
        <OrganizationOverview />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startSearch: (searchKey) => dispatch(startSearch(searchKey))
});

export default withRouter(connect(null, mapDispatchToProps)(Overview));
