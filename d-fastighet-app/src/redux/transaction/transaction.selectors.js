import { createSelector } from 'reselect';
import { getTransaction, checkActiveProperty } from './transaction.utils';

const selectTransaction = (state) => state.transaction;

export const selectTransactions = createSelector([selectTransaction], (transaction) =>
  transaction.transactions ? transaction.dTransactions.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)) : []
);
// export const selectTransactions = createSelector([selectTransaction], (transaction) => (transaction.transactions ? transaction.transactions : []));

export const selectIsSearch = createSelector([selectTransaction], (transaction) => (transaction.searchKey === '' ? false : true));

export const selectIsFetching = createSelector([selectTransaction], (transaction) => transaction.isFetching);

export const selectSearchTransactions = createSelector([selectTransaction], (transaction) =>
  transaction.dTransactions ? transaction.dTransactions.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)) : []
);

export const selectPreviewTransaction = (transactionId) => createSelector([selectTransaction], (transaction) => getTransaction(transactionId, transaction.transactions));

export const selectIsActive = (transactionId) => createSelector([selectTransaction], (transaction) => checkActiveProperty(transactionId, transaction.transactions));
