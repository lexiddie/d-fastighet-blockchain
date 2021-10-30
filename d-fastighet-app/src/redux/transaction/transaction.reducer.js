import { TransactionActionTypes } from './transaction.types';

const INITIAL_STATE = {
  transactions: [],
  dTransactions: [],
  transaction: null,
  searchKey: '',
  isFetching: false,
  errorMessage: undefined
};

const transactionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TransactionActionTypes.FETCH_TRANSACTIONS_START:
      return {
        ...state,
        isFetching: true
      };
    case TransactionActionTypes.FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transactions: action.payload
      };
    case TransactionActionTypes.FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case TransactionActionTypes.GET_TRANSACTION_START:
      return {
        ...state,
        isFetching: true,
        transaction: null
      };
    case TransactionActionTypes.GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transaction: action.payload
      };
    case TransactionActionTypes.GET_TRANSACTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case TransactionActionTypes.TRANSACTION_SEARCH_START:
      return {
        ...state,
        searchKey: action.payload
      };
    case TransactionActionTypes.TRANSACTION_SET_SEARCH_RESULT:
      return {
        ...state,
        dTransactions: action.payload
      };
    case TransactionActionTypes.CLEAN_TRANSACTIONS:
      return {
        ...state,
        transactions: [],
        dTransactions: []
      };
    default:
      return state;
  }
};

export default transactionReducer;
