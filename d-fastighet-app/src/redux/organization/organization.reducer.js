import { OrganizationActionTypes } from './organization.types';

const INITIAL_STATE = {
  organizations: [],
  dOrganizations: [],
  organization: null,
  searchKey: '',
  isFetching: false,
  errorMessage: undefined
};

const organizationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrganizationActionTypes.FETCH_ORGANIZATIONS_START:
      return {
        ...state,
        isFetching: true
      };
    case OrganizationActionTypes.FETCH_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        organizations: action.payload
      };
    case OrganizationActionTypes.FETCH_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case OrganizationActionTypes.ORGANIZATION_SEARCH_START:
      return {
        ...state,
        searchKey: action.payload
      };
    case OrganizationActionTypes.ORGANIZATION_SET_SEARCH_RESULT:
      return {
        ...state,
        dOrganizations: action.payload
      };
    case OrganizationActionTypes.GET_ORGANIZATION:
      return {
        ...state,
        organization: null
      };
    case OrganizationActionTypes.SET_ORGANIZATION:
      return {
        ...state,
        organization: action.payload
      };
    default:
      return state;
  }
};

export default organizationReducer;
