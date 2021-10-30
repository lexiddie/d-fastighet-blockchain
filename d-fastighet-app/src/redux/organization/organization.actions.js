import { OrganizationActionTypes } from './organization.types';

export const fetchOrganizationsStart = () => ({
  type: OrganizationActionTypes.FETCH_ORGANIZATIONS_START
});

export const fetchOrganizationsSuccess = (data) => ({
  type: OrganizationActionTypes.FETCH_ORGANIZATIONS_SUCCESS,
  payload: data
});

export const fetchOrganizationsFailure = (data) => ({
  type: OrganizationActionTypes.FETCH_ORGANIZATIONS_FAILURE,
  payload: data
});

export const startSearch = (searchKey) => ({
  type: OrganizationActionTypes.ORGANIZATION_SEARCH_START,
  payload: searchKey
});

export const setSearchResult = (data) => ({
  type: OrganizationActionTypes.ORGANIZATION_SET_SEARCH_RESULT,
  payload: data
});

export const getOrganization = (customerId) => ({
  type: OrganizationActionTypes.GET_ORGANIZATION,
  payload: customerId
});

export const setOrganization = (data) => ({
  type: OrganizationActionTypes.SET_ORGANIZATION,
  payload: data
});
