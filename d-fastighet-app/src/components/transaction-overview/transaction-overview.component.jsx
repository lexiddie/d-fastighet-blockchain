import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import TransactionItem from '../transaction-item/transaction-item.component';

import { selectTransactions, selectSearchTransactions, selectIsSearch } from '../../redux/transaction/transaction.selectors';

const TransactionOverview = (props) => {
  const { history, isSearch, transactions, dTransactions } = props;
  console.log(`Checking Transactions`, transactions);
  const previewItem = (transactionId) => {
    history.push(`/home/transaction/${transactionId}`);
  };
  useEffect(() => {
    console.log(`Checking Transactions`, transactions);
  }, []);
  return (
    <div className='transaction-overview'>
      <div>
        {isSearch
          ? dTransactions.map((item) => <TransactionItem key={item.id} item={item} previewItem={() => previewItem(item.id)} />)
          : transactions.map((item) => <TransactionItem key={item.id} item={item} previewItem={() => previewItem(item.id)} />)}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  transactions: selectTransactions,
  dTransactions: selectSearchTransactions,
  isSearch: selectIsSearch
});

export default withRouter(connect(mapStateToProps)(TransactionOverview));
