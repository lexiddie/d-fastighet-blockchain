import { AuthenticationActionTypes } from './authentication.types';

const INITIAL_STATE = {
  account: null,
  isFetching: false,
  errorMessage: undefined,
  isSignIn: false,
  isInvalid: false
};

const authenticationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthenticationActionTypes.SIGN_IN_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: undefined,
        isInvalid: false
      };
    case AuthenticationActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        account: action.payload,
        isSignIn: true,
        errorMessage: undefined,
        isInvalid: false
      };
    case AuthenticationActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        isInvalid: true
      };
    case AuthenticationActionTypes.SET_INVALID:
      return {
        ...state,
        isInvalid: false
      };
    case AuthenticationActionTypes.SIGN_OUT:
      delete state.authentication;
      return {
        ...state,
        account: null,
        isFetching: false,
        errorMessage: undefined,
        isSignIn: false,
        isInvalid: false
      };
    default:
      return state;
  }
};

export default authenticationReducer;
