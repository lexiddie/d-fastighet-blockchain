import { AgentActionTypes } from './agent.types';

export const fetchAgentsStart = () => ({
  type: AgentActionTypes.FETCH_AGENTS_START
});

export const fetchAgentsSuccess = (data) => ({
  type: AgentActionTypes.FETCH_AGENTS_SUCCESS,
  payload: data
});

export const fetchAgentsFailure = (data) => ({
  type: AgentActionTypes.FETCH_AGENTS_FAILURE,
  payload: data
});

export const getAgent = (agentId) => ({
  type: AgentActionTypes.GET_AGENT,
  payload: agentId
});

export const setAgent = (data) => ({
  type: AgentActionTypes.SET_AGENT,
  payload: data
});

export const startSearch = (searchKey) => ({
  type: AgentActionTypes.AGENT_SEARCH_START,
  payload: searchKey
});

export const setSearchResult = (data) => ({
  type: AgentActionTypes.AGENT_SET_SEARCH_RESULT,
  payload: data
});
