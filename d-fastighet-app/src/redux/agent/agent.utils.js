export const getAgent = (agentId, agents) => {
  const agent = agents.filter((element) => element.id === agentId)[0];
  return agent;
};

export const searchAgents = (searchKey, agents) => {
  const dAgents = agents.filter((agent) => agent.name.toLowerCase().includes(searchKey.toLowerCase()));
  return dAgents;
};
