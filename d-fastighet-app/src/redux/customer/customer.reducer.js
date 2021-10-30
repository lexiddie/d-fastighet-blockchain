import { CustomerActionTypes } from './customer.types';

const INITIAL_STATE = {
  customers: [],
  dCustomers: [],
  customer: null,
  searchKey: '',
  isFetching: false,
  errorMessage: undefined
};

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerActionTypes.FETCH_CUSTOMERS_START:
      return {
        ...state,
        isFetching: true
      };
    case CustomerActionTypes.FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        customers: action.payload
      };
    case CustomerActionTypes.FETCH_CUSTOMERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case CustomerActionTypes.CUSTOMER_SEARCH_START:
      return {
        ...state,
        searchKey: action.payload
      };
    case CustomerActionTypes.CUSTOMER_SET_SEARCH_RESULT:
      return {
        ...state,
        dCustomers: action.payload
      };
    case CustomerActionTypes.GET_CUSTOMER:
      return {
        ...state,
        customer: null
      };
    case CustomerActionTypes.SET_CUSTOMER:
      return {
        ...state,
        customer: action.payload
      };
    default:
      return state;
  }
};

export default customerReducer;
