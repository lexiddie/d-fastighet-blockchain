import { takeLatest, call, put, all } from 'redux-saga/effects';
import { store } from '../store';

import { fetchCustomers } from './customer.services';
import { searchCustomers, getCustomer } from './customer.utils';
import { fetchCustomersSuccess, fetchCustomersFailure, setSearchResult, setCustomer } from './customer.actions';
import { CustomerActionTypes } from './customer.types';

export function* fetchCustomersAsync() {
  const state = store.getState();
  const orgId = state.authentication.account.orgId;
  try {
    const customers = yield call(fetchCustomers, orgId);
    yield put(fetchCustomersSuccess(customers));
  } catch (error) {
    console.log(`Fetching in customers has error`, error);
    yield put(fetchCustomersFailure(error));
  }
}

export function* fetchCustomersStart() {
  yield takeLatest(CustomerActionTypes.FETCH_CUSTOMERS_START, fetchCustomersAsync);
}

export function* searchStartCustomers({ payload }) {
  const state = store.getState();
  const customers = state.customer.customers;
  try {
    const dCustomers = yield call(searchCustomers, payload, customers);
    yield put(setSearchResult(dCustomers));
  } catch (error) {
    console.log(`Searching has error`, error);
  }
}

export function* searchStart() {
  yield takeLatest(CustomerActionTypes.CUSTOMER_SEARCH_START, searchStartCustomers);
}

export function* fetchCustomerAsync({ payload }) {
  const state = store.getState();
  const customers = state.customer.customers;
  try {
    const customer = yield call(getCustomer, payload, customers);
    yield put(setCustomer(customer));
  } catch (error) {
    console.log(`get customer has error`, error);
  }
}

export function* fetchCustomer() {
  yield takeLatest(CustomerActionTypes.GET_CUSTOMER, fetchCustomerAsync);
}

export function* customersSagas() {
  yield all([call(fetchCustomersStart), call(searchStart), call(fetchCustomer)]);
}
