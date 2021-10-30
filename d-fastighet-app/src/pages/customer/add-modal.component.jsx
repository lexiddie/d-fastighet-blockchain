import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Input, Modal, ModalHeader, ModalFooter, Card, CardBody, FormGroup } from 'reactstrap';

import { selectOrgId } from '../../redux/authentication/authentication.selectors';

const AddModal = (props) => {
  const { modal, toggle, addCustomer, orgId } = props;
  const [record, setRecord] = useState({});

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
    addCustomer(data, orgId);
    toggle();
  };

  useEffect(() => {}, [modal]);

  return (
    <Modal className='modal-rounded' size='md' centered isOpen={modal} toggle={toggle}>
      <Card>
        <ModalHeader className='modal-header' toggle={toggle}>
          Add Customer
        </ModalHeader>
        <CardBody>
          <Form onSubmit={(e) => submitRecord(e)}>
            <FormGroup>
              <span className='modal-label'>Name</span>
              <Input className='modal-input' type='text' name='name' placeholder='Name' required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Email</span>
              <Input className='modal-input' type='text' name='email' placeholder='Email' required onChange={onRecord}></Input>
            </FormGroup>

            <FormGroup>
              <span className='modal-label'>Phone</span>
              <Input className='modal-input' type='text' name='phone' placeholder='Phone' required onChange={onRecord}></Input>
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
  orgId: selectOrgId
});

export default connect(mapStateToProps)(AddModal);
