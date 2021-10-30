import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input } from 'reactstrap';

import { firestore } from '../../firebase/firebase.utils';

import CustomerOverview from '../../components/customer-overview/customer-overview.component';
import { startSearch } from '../../redux/customer/customer.actions';
import { fetchCustomersStart } from '../../redux/customer/customer.actions';

import AddModal from './add-modal.component';

const Overview = (props) => {
  const { startSearch, fetchCustomersStart } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onChangeSearch = (event) => {
    const { value } = event.target;
    startSearch(value);
  };

  const addCustomer = async (data, orgId) => {
    const customerRef = firestore.collection('customers');
    const recordId = customerRef.doc().id;
    customerRef
      .doc(recordId)
      .set({
        id: recordId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        orgId: orgId,
        createdAt: new Date().toISOString()
      })
      .then(() => {
        console.log(`Customer has been committed`);
        fetchCustomersStart();
        startSearch('');
      })
      .catch((err) => {
        console.log(`Err has occurred: `, err);
      });
  };

  useEffect(() => {
    startSearch('');
  }, []);
  return (
    <>
      <AddModal modal={modal} toggle={toggle} addCustomer={addCustomer} />
      <div className='customer-search'>
        <Input type='search' name='search' placeholder='Search' onChange={(e) => onChangeSearch(e)} />
      </div>
      <div className='modal-actions'>
        <button type='button' onClick={toggle}>
          Add Customer
        </button>
      </div>
      <div className='customer-content'>
        <CustomerOverview />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startSearch: (searchKey) => dispatch(startSearch(searchKey)),
  fetchCustomersStart: () => dispatch(fetchCustomersStart())
});

export default withRouter(connect(null, mapDispatchToProps)(Overview));
