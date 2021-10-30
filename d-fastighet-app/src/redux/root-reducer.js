import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authenticationReducer from './authentication/authentication.reducer';
import transactionReducer from './transaction/transaction.reducer';
import organizationReducer from './organization/organization.reducer';
import customerReducer from './customer/customer.reducer';
import agentReducer from './agent/agent.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whileList: ['authentication']
};

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  transaction: transactionReducer,
  organization: organizationReducer,
  customer: customerReducer,
  agent: agentReducer
});

export default persistReducer(persistConfig, rootReducer);
