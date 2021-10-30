import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input } from 'reactstrap';

import { firestore } from '../../firebase/firebase.utils';

import AgentOverview from '../../components/agent-overview/agent-overview.component';
import { startSearch } from '../../redux/agent/agent.actions';
import { fetchAgentsStart } from '../../redux/agent/agent.actions';

import AddModal from './add-modal.component';

const Overview = (props) => {
  const { startSearch, fetchAgentsStart } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onChangeSearch = (event) => {
    const { value } = event.target;
    startSearch(value);
  };

  const addAgent = async (data, orgId) => {
    const agentRef = firestore.collection('agents');
    const recordId = agentRef.doc().id;
    agentRef
      .doc(recordId)
      .set({
        id: recordId,
        name: data.name,
        orgId: orgId,
        createdAt: new Date().toISOString()
      })
      .then(() => {
        console.log(`Agent has been committed`);
        fetchAgentsStart();
        startSearch('');
      })
      .catch((err) => {
        console.log(`Err has occurred: `, err);
      });
  };

  useEffect(() => {
    startSearch('');
  }, []);
  return (
    <>
      <AddModal modal={modal} toggle={toggle} addAgent={addAgent} />
      <div className='agent-search'>
        <Input type='search' name='search' placeholder='Search' onChange={(e) => onChangeSearch(e)} />
      </div>
      <div className='modal-actions'>
        <button type='button' onClick={toggle}>
          Add Agent
        </button>
      </div>
      <div className='agent-content'>
        <AgentOverview />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startSearch: (searchKey) => dispatch(startSearch(searchKey)),
  fetchAgentsStart: () => dispatch(fetchAgentsStart())
});

export default withRouter(connect(null, mapDispatchToProps)(Overview));
