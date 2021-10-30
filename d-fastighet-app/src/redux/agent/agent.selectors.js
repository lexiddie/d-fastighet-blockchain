import { createSelector } from 'reselect';
import { getAgent } from './agent.utils';

const selectAgent = (state) => state.agent;

export const selectAgents = createSelector([selectAgent], (agent) => agent.agents);

export const selectIsSearch = createSelector([selectAgent], (agent) => (agent.searchKey === '' ? false : true));

export const selectSearchAgents = createSelector([selectAgent], (agent) => (agent.dAgents ? agent.dAgents.sort((a, b) => (a.name < b.name ? 1 : -1)) : []));

export const selectCurrentAgent = createSelector([selectAgent], (agent) => agent.agent);

export const selectPreviewAgent = (agentId) => createSelector([selectAgent], (agent) => getAgent(agentId, agent.agents));
