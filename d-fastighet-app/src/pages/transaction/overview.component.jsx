import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { v4 } from 'uuid';
import { SHA1 } from 'crypto-js';
import axios from '../../redux/root-axios';

import { Input } from 'reactstrap';

import TransactionOverview from '../../components/transaction-overview/transaction-overview.component';
import { startSearch } from '../../redux/transaction/transaction.actions';
import { selectIsFetching } from '../../redux/transaction/transaction.selectors';

import { selectOrgId } from '../../redux/authentication/authentication.selectors';
import { selectOrgKey } from '../../redux/authentication/authentication.selectors';
import { fetchTransactionsStart } from '../../redux/transaction/transaction.actions';

import AddModal from './add-modal.component';

const Overview = (props) => {
  const { startSearch, accountOrgId, fetchTransactionsStart, orgKey, isFetching } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onChangeSearch = (event) => {
    const { value } = event.target;
    startSearch(value);
  };

  const dispatchTransaction = async (data, channel) => {
    let orgIndex = 0;
    const organizations = ['org1', 'org2', 'org3'];
    organizations.forEach((item, index) => {
      if (orgKey === item) {
        orgIndex = index;
        return;
      }
    });
    return await axios.post(`add_property/${orgIndex}?channel=${channel}`, { price: parseFloat(data.price), ...data });
  };

  const addTransaction = async (data, channel) => {
    const uuid = v4();
    const genId = SHA1(uuid).toString();
    console.log(`Checking UUID`, genId);
    const record = {
      id: genId,
      orgId: accountOrgId,
      createdAt: new Date().toISOString(),
      price: parseFloat(data.price),
      previousId: '',
      ...data
    };
    console.log(`Checking Record before submit`, record);
    try {
      const result = await dispatchTransaction(record, channel);
      console.log(`Checking Result`, result);
      fetchTransactionsStart();
      startSearch('');
    } catch (error) {
      console.log(`Dispatch transaction has error:`, error);
    }
  };

  const uuid = v4();
  const genId = SHA1(uuid).toString();
  console.log(`Checking UUID`, genId);

  useEffect(() => {
    startSearch('');
  }, [isFetching]);
  return (
    <>
      <AddModal modal={modal} toggle={toggle} addTransaction={addTransaction} />
      <div className='transaction-search'>
        <Input type='search' name='search' placeholder='Search' onChange={(e) => onChangeSearch(e)} />
      </div>
      <div className='modal-actions'>
        <button type='button' onClick={toggle}>
          Add Transaction
        </button>
      </div>
      <div className='transaction-content'>
        <TransactionOverview />
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  accountOrgId: selectOrgId,
  orgKey: selectOrgKey,
  isFetching: selectIsFetching
});

const mapDispatchToProps = (dispatch) => ({
  startSearch: (searchKey) => dispatch(startSearch(searchKey)),
  fetchTransactionsStart: () => dispatch(fetchTransactionsStart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview));
