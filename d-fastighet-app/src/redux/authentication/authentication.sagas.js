import { takeLatest, call, put, all } from 'redux-saga/effects';

import { authenticatedAccount } from './authentication.services';
import { signInSuccess, signInFailure } from './authentication.actions';
import { AuthenticationActionTypes } from './authentication.types';

import { cleanTransactions } from '../transaction/transaction.actions';

export function* signInStartAsync({ payload }) {
  try {
    const account = yield call(authenticatedAccount, payload);
    if (account == null) {
      yield put(signInFailure('No account is found'));
    } else {
      yield put(signInSuccess(account));
    }
  } catch (error) {
    console.log(`Authenticated account has error`, error);
    yield put(signInFailure(error));
  }
}

export function* signInStart() {
  yield takeLatest(AuthenticationActionTypes.SIGN_IN_START, signInStartAsync);
}

export function* signOutStartAsync() {
  try {
    yield put(cleanTransactions());
  } catch (error) {
    console.log(`Clean transactions has error`, error);
  }
}

export function* signOutStart() {
  yield takeLatest(AuthenticationActionTypes.SIGN_OUT, signOutStartAsync);
}

export function* authenticationSagas() {
  yield all([call(signInStart), call(signOutStart)]);
}
