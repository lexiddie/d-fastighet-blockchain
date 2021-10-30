import { all, call } from 'redux-saga/effects';

import { authenticationSagas } from './authentication/authentication.sagas';
import { transactionSagas } from './transaction/transaction.sagas';
import { organizationSagas } from './organization/organization.sagas';
import { customersSagas } from './customer/customer.sagas';
import { agentSagas } from './agent/agent.sagas';

export default function* rootSaga() {
  yield all([call(authenticationSagas), call(transactionSagas), call(organizationSagas), call(customersSagas), call(agentSagas)]);
}
