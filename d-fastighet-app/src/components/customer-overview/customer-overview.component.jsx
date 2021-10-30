import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomerItem from '../customer-item/customer-item.component';

import { selectCustomers, selectSearchCustomers, selectIsSearch } from '../../redux/customer/customer.selectors';

const CustomerOverview = (props) => {
  const { history, isSearch, customers, dCustomers } = props;
  const previewItem = (customerId) => {
    history.push(`/home/customer/${customerId}`);
  };
  return (
    <div className='customer-overview'>
      <div>
        {isSearch
          ? dCustomers.map((item) => <CustomerItem key={item.id} item={item} previewItem={() => previewItem(item.id)} />)
          : customers.map((item) => <CustomerItem key={item.id} item={item} previewItem={() => previewItem(item.id)} />)}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  customers: selectCustomers,
  dCustomers: selectSearchCustomers,
  isSearch: selectIsSearch
});

export default withRouter(connect(mapStateToProps)(CustomerOverview));
