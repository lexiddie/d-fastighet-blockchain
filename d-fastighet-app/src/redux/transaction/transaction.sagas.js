import { takeLatest, call, put, all } from 'redux-saga/effects';
import { store } from '../store';

import { fetchTransactions } from './transaction.services';
import { searchTransactions, cleanPublicTransaction, cleanPrivateTransaction } from './transaction.utils';
import { fetchTransactionsSuccess, fetchTransactionsFailure, setSearchResult } from './transaction.actions';
import { TransactionActionTypes } from './transaction.types';

export function* fetchTransactionsAsync() {
  const state = store.getState();
  const orgKey = state.authentication.account.orgKey;
  let orgIndex = 0;
  const organizations = ['org1', 'org2', 'org3'];
  organizations.forEach((item, index) => {
    if (orgKey === item) {
      orgIndex = index;
      return;
    }
  });
  try {
    let records = [];
    const first = yield call(fetchTransactions, orgIndex, 0);
    const firstData = cleanPublicTransaction(first.data);
    records.push.apply(records, firstData);
    if (orgKey !== 'org3') {
      const second = yield call(fetchTransactions, orgIndex, 1);
      const secondData = cleanPrivateTransaction(second.data);
      if (secondData.length !== 0) {
        records.push.apply(records, secondData);
      }
    }
    yield put(fetchTransactionsSuccess(records));
  } catch (error) {
    console.log(`Fetching in transactions has error`, error);
    yield put(fetchTransactionsFailure(error));
  }
}

export function* fetchTransactionsStart() {
  yield takeLatest(TransactionActionTypes.FETCH_TRANSACTIONS_START, fetchTransactionsAsync);
}

export function* searchStartTransactions({ payload }) {
  const state = store.getState();
  const transactions = state.transaction.transactions;
  try {
    const dTransactions = yield call(searchTransactions, payload, transactions);
    yield put(setSearchResult(dTransactions));
  } catch (error) {
    console.log(`Searching has error`, error);
  }
}

export function* searchStart() {
  yield takeLatest(TransactionActionTypes.TRANSACTION_SEARCH_START, searchStartTransactions);
}

export function* transactionSagas() {
  yield all([call(fetchTransactionsStart), call(searchStart)]);
}
