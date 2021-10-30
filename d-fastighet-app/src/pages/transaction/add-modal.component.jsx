import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Input, Modal, ModalHeader, ModalFooter, Card, CardBody, FormGroup } from 'reactstrap';

import { selectCustomers } from '../../redux/customer/customer.selectors';
import { selectAgents } from '../../redux/agent/agent.selectors';
import { selectOrgKey } from '../../redux/authentication/authentication.selectors';

const AddModal = (props) => {
  const { modal, toggle, customers, agents, addTransaction, orgKey } = props;
  const [record, setRecord] = useState({});
  const [channel, setChannel] = useState('Public');
  const [channels, setChannels] = useState(['Public']);

  const types = ['Residential', 'Commercial', 'Industrial', 'Land'];

  const onRecord = (event) => {
    const { value, name } = event.target;
    setRecord({
      ...record,
      [name]: value
    });
  };

  const onChannel = (event) => {
    const { value } = event.target;
    setChannel({
      value
    });
  };

  const submitRecord = async (event) => {
    event.preventDefault();
    const data = {
      ...record
    };
    const value = channel === 'Public' ? 0 : 1;
    addTransaction(data, value);
    toggle();
  };

  const dispatchChannel = () => {
    const records = ['Public', 'Private'];
    if (orgKey !== 'org3') {
      setChannels(records);
    }
  };

  useEffect(() => {
    dispatchChannel();
    setRecord({
      ...record,
      ownerId: customers.length !== 0 ? customers[0].id : null,
      agentId: agents[0].id,
      type: types[0]
    });
  }, [modal]);

  return (
    <Modal className='modal-rounded' size='md' centered isOpen={modal} toggle={toggle}>
      <Card>
        <ModalHeader className='modal-header' toggle={toggle}>
          Add Transaction
        </ModalHeader>
        <CardBody>
          <Form onSubmit={(e) => submitRecord(e)}>
            <FormGroup>
              <span className='modal-label' htmlFor='channel'>
                Channel
              </span>
              <Input className='modal-selection w-100 modal-input' type='select' name='type' id='channel' required onChange={onChannel}>
                {channels.map((element, index) => (
                  <option key={`channel-${index}`} value={element}>
                    {element}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label' htmlFor='ownerId'>
                Customer
              </span>
              <Input className='modal-selection w-100 modal-input' type='select' name='ownerId' id='ownerId' required onChange={onRecord}>
                {customers.map((element, index) => (
                  <option key={`customer-${index}`} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label' htmlFor='agentId'>
                Agent
              </span>
              <Input className='modal-selection w-100 modal-input' type='select' name='agentId' id='agentId' required onChange={onRecord}>
                {agents.map((element, index) => (
                  <option key={`customer-${index}`} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Property Type</span>
              <Input className='modal-selection w-100 modal-input' type='select' name='type' required onChange={onRecord}>
                {types.map((element, index) => (
                  <option key={`type-${index}`} value={element}>
                    {element}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Name</span>
              <Input className='modal-input' type='text' name='name' placeholder='Name' required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Price</span>
              <Input className='modal-input' type='number' name='price' placeholder='Price' required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Address</span>
              <Input className='modal-input' type='text' name='address' placeholder='Address' required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>About</span>
              <Input className='modal-input' type='text' name='about' placeholder='About' required onChange={onRecord}></Input>
            </FormGroup>

            <ModalFooter className='d-flex flex-wrap justify-content-between'>
              <Button className='w-40x main-btn-primary' type='submit'>
                Confirm
              </Button>
              <Button className='w-40x main-btn-caution' onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </CardBody>
      </Card>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  customers: selectCustomers,
  agents: selectAgents,
  orgKey: selectOrgKey
});

export default connect(mapStateToProps)(AddModal);
