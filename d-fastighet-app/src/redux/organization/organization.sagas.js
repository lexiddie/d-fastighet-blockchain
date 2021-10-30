import { takeLatest, call, put, all } from 'redux-saga/effects';
import { store } from '../store';

import { fetchOrganizations } from './organization.services';
import { searchOrganizations, getOrganization } from './organization.utils';
import { fetchOrganizationsSuccess, fetchOrganizationsFailure, setSearchResult, setOrganization } from './organization.actions';
import { OrganizationActionTypes } from './organization.types';

export function* fetchOrganizationsAsync() {
  try {
    const organizations = yield call(fetchOrganizations);
    yield put(fetchOrganizationsSuccess(organizations));
  } catch (error) {
    console.log(`Fetching in organizations has error`, error);
    yield put(fetchOrganizationsFailure(error));
  }
}

export function* fetchOrganizationsStart() {
  yield takeLatest(OrganizationActionTypes.FETCH_ORGANIZATIONS_START, fetchOrganizationsAsync);
}

export function* searchStartOrganizations({ payload }) {
  const state = store.getState();
  const organizations = state.organization.organizations;
  try {
    const dOrganizations = yield call(searchOrganizations, payload, organizations);
    yield put(setSearchResult(dOrganizations));
  } catch (error) {
    console.log(`Searching has error`, error);
  }
}

export function* searchStart() {
  yield takeLatest(OrganizationActionTypes.ORGANIZATION_SEARCH_START, searchStartOrganizations);
}

export function* fetchOrganizationAsync({ payload }) {
  const state = store.getState();
  const organizations = state.organization.organizations;
  try {
    const organization = yield call(getOrganization, payload, organizations);
    yield put(setOrganization(organization));
  } catch (error) {
    console.log(`get organization has error`, error);
  }
}

export function* fetchOrganization() {
  yield takeLatest(OrganizationActionTypes.GET_ORGANIZATION, fetchOrganizationAsync);
}

export function* organizationSagas() {
  yield all([call(fetchOrganizationsStart), call(searchStart), call(fetchOrganization)]);
}
