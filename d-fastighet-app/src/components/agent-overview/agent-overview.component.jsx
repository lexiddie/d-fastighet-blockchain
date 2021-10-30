import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import AgentItem from '../agent-item/agent-item.component';

import { selectAgents, selectSearchAgents, selectIsSearch } from '../../redux/agent/agent.selectors';

const AgentOverview = (props) => {
  const { history, isSearch, agents, dAgents } = props;
  const previewItem = (agentId) => {
    history.push(`/home/agent/${agentId}`);
  };
  return (
    <div className='agent-overview'>
      <div>
        {isSearch
          ? dAgents.map((item) => <AgentItem key={item.id} item={item} previewItem={() => previewItem(item.id)} />)
          : agents.map((item) => <AgentItem key={item.id} item={item} previewItem={() => previewItem(item.id)} />)}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  agents: selectAgents,
  dAgents: selectSearchAgents,
  isSearch: selectIsSearch
});

export default withRouter(connect(mapStateToProps)(AgentOverview));
