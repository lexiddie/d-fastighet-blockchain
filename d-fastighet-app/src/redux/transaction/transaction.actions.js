import { TransactionActionTypes } from './transaction.types';

export const fetchTransactionsStart = () => ({
  type: TransactionActionTypes.FETCH_TRANSACTIONS_START
});

export const fetchTransactionsSuccess = (data) => ({
  type: TransactionActionTypes.FETCH_TRANSACTIONS_SUCCESS,
  payload: data
});

export const fetchTransactionsFailure = (data) => ({
  type: TransactionActionTypes.FETCH_TRANSACTIONS_FAILURE,
  payload: data
});

export const getTransactionStart = () => ({
  type: TransactionActionTypes.GET_TRANSACTION_START
});

export const getTransactionSuccess = (data) => ({
  type: TransactionActionTypes.GET_TRANSACTION_SUCCESS,
  payload: data
});

export const getTransactionFailure = (data) => ({
  type: TransactionActionTypes.GET_TRANSACTION_FAILURE,
  payload: data
});

export const startSearch = (searchKey) => ({
  type: TransactionActionTypes.TRANSACTION_SEARCH_START,
  payload: searchKey
});

export const setSearchResult = (data) => ({
  type: TransactionActionTypes.TRANSACTION_SET_SEARCH_RESULT,
  payload: data
});

export const cleanTransactions = () => ({
  type: TransactionActionTypes.CLEAN_TRANSACTIONS
});
