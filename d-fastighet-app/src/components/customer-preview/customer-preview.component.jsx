import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment';

import { selectPreviewCustomer } from '../../redux/customer/customer.selectors';
import { getOrganization } from '../../redux/organization/organization.actions';
import { selectCurrentOrganization } from '../../redux/organization/organization.selectors';

import ProfileIcon from '../../assets/profile.png';
import OrganizationIcon from '../../assets/organization.png';

const CustomerPreview = (props) => {
  const { customer, organization, getOrganization } = props;
  const { id, name, email, phone, createdAt, orgId } = customer;

  useEffect(() => {
    getOrganization(orgId);
  }, []);

  return (
    <div className='customer-preview'>
      <div>
        <div>
          <div>
            <img src={ProfileIcon} alt='Profile Icon' />
          </div>
        </div>
        <div>
          <div>
            <div className='customer-status'>
              <span>{`Active Customer`}</span>
            </div>
            <div className='display-span'>
              <span>Customer ID</span>
              <span>{id}</span>
            </div>
            <div className='display-span'>
              <span>Name</span>
              <span>{name}</span>
            </div>
            <div className='display-span'>
              <span>Email</span>
              <span>{email}</span>
            </div>
            <div className='display-span'>
              <span>Phone number</span>
              <span>{phone}</span>
            </div>
            <div className='org-info'>
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
  customer: selectPreviewCustomer(ownProps.match.params.customerId)(state),
  organization: selectCurrentOrganization(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOrganization: (organizationId) => dispatch(getOrganization(organizationId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerPreview));
