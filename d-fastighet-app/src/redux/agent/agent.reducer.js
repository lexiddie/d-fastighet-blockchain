import { AgentActionTypes } from './agent.types';

const INITIAL_STATE = {
  agents: [],
  dAgents: [],
  searchKey: '',
  agent: null,
  isFetching: false,
  errorMessage: undefined
};

const agentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AgentActionTypes.FETCH_AGENTS_START:
      return {
        ...state,
        isFetching: true
      };
    case AgentActionTypes.FETCH_AGENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        agents: action.payload
      };
    case AgentActionTypes.FETCH_AGENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case AgentActionTypes.GET_AGENT:
      return {
        ...state,
        agent: null
      };
    case AgentActionTypes.SET_AGENT:
      return {
        ...state,
        agent: action.payload
      };
    case AgentActionTypes.AGENT_SEARCH_START:
      return {
        ...state,
        searchKey: action.payload
      };
    case AgentActionTypes.AGENT_SET_SEARCH_RESULT:
      return {
        ...state,
        dAgents: action.payload
      };
    default:
      return state;
  }
};

export default agentReducer;
