import { takeLatest, call, put, all } from 'redux-saga/effects';
import { store } from '../store';

import { fetchAgents } from './agent.services';
import { searchAgents, getAgent } from './agent.utils';
import { fetchAgentsSuccess, fetchAgentsFailure, setAgent, setSearchResult } from './agent.actions';
import { AgentActionTypes } from './agent.types';

export function* fetchAgentsAsync() {
  const state = store.getState();
  const orgId = state.authentication.account.orgId;
  try {
    const agents = yield call(fetchAgents, orgId);
    yield put(fetchAgentsSuccess(agents));
  } catch (error) {
    console.log(`Fetching in agents has error`, error);
    yield put(fetchAgentsFailure(error));
  }
}

export function* fetchAgentsStart() {
  yield takeLatest(AgentActionTypes.FETCH_AGENTS_START, fetchAgentsAsync);
}

export function* fetchAgentAsync({ payload }) {
  const state = store.getState();
  const agents = state.agent.agents;
  try {
    const agent = yield call(getAgent, payload, agents);
    yield put(setAgent(agent));
  } catch (error) {
    console.log(`Fetching in agent has error`, error);
  }
}

export function* fetchAgentStart() {
  yield takeLatest(AgentActionTypes.GET_AGENT, fetchAgentAsync);
}

export function* searchStartAgents({ payload }) {
  const state = store.getState();
  const agents = state.agent.agents;
  try {
    const dAgents = yield call(searchAgents, payload, agents);
    yield put(setSearchResult(dAgents));
  } catch (error) {
    console.log(`Searching has error`, error);
  }
}

export function* searchStart() {
  yield takeLatest(AgentActionTypes.AGENT_SEARCH_START, searchStartAgents);
}

export function* agentSagas() {
  yield all([call(fetchAgentsStart), call(fetchAgentStart), call(searchStart)]);
}
