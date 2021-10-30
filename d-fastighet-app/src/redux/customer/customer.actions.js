import { CustomerActionTypes } from './customer.types';

export const fetchCustomersStart = () => ({
  type: CustomerActionTypes.FETCH_CUSTOMERS_START
});

export const fetchCustomersSuccess = (data) => ({
  type: CustomerActionTypes.FETCH_CUSTOMERS_SUCCESS,
  payload: data
});

export const fetchCustomersFailure = (data) => ({
  type: CustomerActionTypes.FETCH_CUSTOMERS_FAILURE,
  payload: data
});

export const startSearch = (searchKey) => ({
  type: CustomerActionTypes.CUSTOMER_SEARCH_START,
  payload: searchKey
});

export const setSearchResult = (data) => ({
  type: CustomerActionTypes.CUSTOMER_SET_SEARCH_RESULT,
  payload: data
});

export const getCustomer = (customerId) => ({
  type: CustomerActionTypes.GET_CUSTOMER,
  payload: customerId
});

export const setCustomer = (data) => ({
  type: CustomerActionTypes.SET_CUSTOMER,
  payload: data
});
