import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Input, Modal, ModalHeader, ModalFooter, Card, CardBody, FormGroup } from 'reactstrap';

import { selectCustomers } from '../../redux/customer/customer.selectors';
import { selectAgents } from '../../redux/agent/agent.selectors';

const ChangeModal = (props) => {
  const { modal, toggle, customers, agents, transferTransaction, ledger } = props;
  const [record, setRecord] = useState({});

  const types = ['Residential', 'Commercial', 'Industrial', 'Land'];

  const onRecord = (event) => {
    const { value, name } = event.target;
    setRecord({
      ...record,
      [name]: value
    });
  };

  const submitRecord = async (event) => {
    event.preventDefault();
    const data = {
      ...record
    };

    transferTransaction(data);
    toggle();
  };

  useEffect(() => {
    setRecord({
      ...ledger
    });
  }, [modal]);

  return (
    <Modal className='modal-rounded' size='md' centered isOpen={modal} toggle={toggle}>
      <Card>
        <ModalHeader className='modal-header' toggle={toggle}>
          Transfer Property To New Owner💂🏿‍♀️
        </ModalHeader>
        <CardBody>
          <Form onSubmit={(e) => submitRecord(e)}>
            <FormGroup>
              <span className='modal-label' htmlFor='ownerId'>
                Customer
              </span>
              <Input className='modal-selection w-100 modal-input' type='select' name='ownerId' id='ownerId' required onChange={onRecord}>
                {customers.map((element, index) => {
                  if (element.id === ledger.ownerId) {
                    return (
                      <option selected='selected' key={`owner-${index}`} value={element.id}>
                        {element.name}
                      </option>
                    );
                  } else {
                    return (
                      <option key={`owner-${index}`} value={element.id}>
                        {element.name}
                      </option>
                    );
                  }
                })}
              </Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label' htmlFor='agentId'>
                Agent
              </span>
              <Input className='modal-selection w-100 modal-input' type='select' name='agentId' id='agentId' required onChange={onRecord}>
                {agents.map((element, index) => {
                  if (element.id === ledger.agentId) {
                    return (
                      <option selected='selected' key={`agent-${index}`} value={element.id}>
                        {element.name}
                      </option>
                    );
                  } else {
                    return (
                      <option key={`agent-${index}`} value={element.id}>
                        {element.name}
                      </option>
                    );
                  }
                })}
              </Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Property Type</span>
              <Input className='modal-selection w-100 modal-input' type='select' name='type' disabled required onChange={onRecord}>
                {types.map((element, index) => {
                  if (element === ledger.type) {
                    return (
                      <option selected='selected' key={`type-${index}`} value={element}>
                        {element}
                      </option>
                    );
                  } else {
                    return (
                      <option key={`type-${index}`} value={element}>
                        {element}
                      </option>
                    );
                  }
                })}
              </Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Name</span>
              <Input className='modal-input' type='text' name='name' placeholder='Name' defaultValue={ledger.name} disabled required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Price</span>
              <Input className='modal-input' type='number' name='price' placeholder='Price' defaultValue={ledger.price} required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Address</span>
              <Input className='modal-input' type='text' name='address' placeholder='Address' defaultValue={ledger.address} disabled required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>About</span>
              <Input className='modal-input' type='text' name='about' placeholder='About' defaultValue={ledger.about} disabled required onChange={onRecord}></Input>
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
  agents: selectAgents
});

export default connect(mapStateToProps)(ChangeModal);
