import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Moment from 'moment';
import { v4 } from 'uuid';
import { SHA1 } from 'crypto-js';
import axios from '../../redux/root-axios';

import { selectPreviewTransaction, selectIsActive } from '../../redux/transaction/transaction.selectors';

import { getCustomer } from '../../redux/customer/customer.actions';
import { selectCurrentCustomer } from '../../redux/customer/customer.selectors';

import { getOrganization } from '../../redux/organization/organization.actions';
import { selectCurrentOrganization } from '../../redux/organization/organization.selectors';

import { getAgent } from '../../redux/agent/agent.actions';
import { selectCurrentAgent } from '../../redux/agent/agent.selectors';
import { selectOrgKey } from '../../redux/authentication/authentication.selectors';

import BuildingIcon from '../../assets/building.png';
import ProfileIcon from '../../assets/profile.png';
import OrganizationIcon from '../../assets/organization.png';

import TransferModal from './transfer-modal.component';

import { fetchTransactionsStart } from '../../redux/transaction/transaction.actions';

const TransactionPreview = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const { history, transaction, getCustomer, customer, getOrganization, organization, getAgent, agent, fetchTransactionsStart, orgKey, isActive } = props;
  const { id, type, name, price, address, about, ownerId, agentId, orgId, createdAt, previousId, channel } = transaction;

  console.log(`Checking IsActive`, isActive);

  const dispatchTransaction = async (data) => {
    let orgIndex = 0;
    const organizations = ['org1', 'org2', 'org3'];
    organizations.forEach((item, index) => {
      if (orgKey === item) {
        orgIndex = index;
        return;
      }
    });
    return await axios.post(`add_property/${orgIndex}?channel=${data.channel}`, { price: parseFloat(data.price), ...data });
  };

  const transferTransaction = async (data) => {
    console.log(`Checking Record before transfer`, data);
    if (data.ownerId !== ownerId) {
      try {
        const uuid = v4();
        const genId = SHA1(uuid).toString();
        const record = {
          ...data,
          id: genId,
          createdAt: new Date().toISOString(),
          previousId: id
        };
        const result = await dispatchTransaction(record);
        console.log(`Checking Result`, result);
        if (result.code === 200) {
          fetchTransactionsStart();
          setTimeout(() => {
            console.log(`Direct into new property owner`);
            history.push(`/home/transaction/${genId}`);
          }, 1000);
        }
      } catch (error) {
        console.log(`Dispatch transfer transaction has error:`, error);
      }
    }
  };

  const openPrevious = (previousId) => {
    history.push(`/home/transaction/${previousId}`);
  };

  const openOwner = (ownerId) => {
    history.push(`/home/customer/${ownerId}`);
  };

  const openAgent = (agentId) => {
    history.push(`/home/agent/${agentId}`);
  };

  useEffect(() => {
    getCustomer(ownerId);
    getAgent(agentId);
    getOrganization(orgId);
  }, [transaction, isActive]);
  return (
    <div className='transaction-preview'>
      <TransferModal modal={modal} toggle={toggle} transferTransaction={transferTransaction} ledger={transaction} />
      <div>
        <div>
          <div>
            <img src={BuildingIcon} alt='Property Icon' />
          </div>
        </div>
        <div>
          <div>
            <div className='transaction-status'>
              <span>{`${!isActive ? 'Active' : 'Inactive'} Transaction`}</span>
            </div>
            <div className={`transaction-actions ${isActive ? 'hide' : ''}`}>
              <button type='button' onClick={toggle}>
                Transfer Owner
              </button>
            </div>
            <div className='display-span'>
              <span>Transaction ID</span>
              <span>{id}</span>
            </div>
            <div className='display-span'>
              <span>Channel</span>
              <span>{`${channel === 0 ? 'Public Channel' : 'Private Channel'}`}</span>
            </div>
            <div className='display-span'>
              <span>Property Type</span>
              <span>{type}</span>
            </div>
            <div className='display-span'>
              <span>Name</span>
              <span>{name}</span>
            </div>
            <div className='display-span'>
              <span>Price</span>
              <NumberFormat className='price' value={price} displayType={'text'} thousandSeparator={true} prefix={'฿'} />
            </div>
            <div className='display-span'>
              <span>Address</span>
              <span>{address}</span>
            </div>
            <div className='display-span'>
              <span>About</span>
              <span>{about}</span>
            </div>
            <div className='party-info'>
              {customer != null ? (
                <>
                  <span>Owned By</span>
                  <div className='previous' onClick={() => openOwner(ownerId)}>
                    <img src={ProfileIcon} alt='Profile Icon' />
                    <span>{customer.name}</span>
                  </div>
                </>
              ) : null}
            </div>
            <div className='party-info'>
              {previousId !== '' ? (
                <>
                  <span>Previous Owner Property</span>
                  <div className='previous' onClick={() => openPrevious(previousId)}>
                    <span className='previous'>{previousId}</span>
                  </div>
                </>
              ) : null}
            </div>
            <div className='party-info'>
              {agent != null ? (
                <>
                  <span>Coordinated agent</span>
                  <div className='previous' onClick={() => openAgent(agentId)}>
                    <img src={ProfileIcon} alt='Profile Icon' />
                    <span>{agent.name}</span>
                  </div>
                </>
              ) : null}
            </div>
            <div className='party-info'>
              {organization != null ? (
                <>
                  <span>Organized By</span>
                  <div>
                    <img src={OrganizationIcon} alt='Organization Icon' />
                    <span>{organization.name}</span>
                  </div>
                </>
              ) : null}
            </div>
            <div className='display-span'>
              <span>Created At</span>
              <span>{Moment.utc(createdAt).local().format('MMMM, DD YYYY HH:mm')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  transaction: selectPreviewTransaction(ownProps.match.params.transactionId)(state),
  customer: selectCurrentCustomer(state),
  organization: selectCurrentOrganization(state),
  agent: selectCurrentAgent(state),
  orgKey: selectOrgKey(state),
  isActive: selectIsActive(ownProps.match.params.transactionId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  getCustomer: (customerId) => dispatch(getCustomer(customerId)),
  getOrganization: (organizationId) => dispatch(getOrganization(organizationId)),
  getAgent: (agentId) => dispatch(getAgent(agentId)),
  fetchTransactionsStart: () => dispatch(fetchTransactionsStart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionPreview));
