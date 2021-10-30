import { createSelector } from 'reselect';
import { getCustomer } from './customer.utils';

const selectCustomer = (state) => state.customer;

export const selectCustomers = createSelector([selectCustomer], (customer) => (customer.customers ? customer.customers : []));

export const selectIsSearch = createSelector([selectCustomer], (customer) => (customer.searchKey === '' ? false : true));

export const selectSearchCustomers = createSelector([selectCustomer], (customer) => (customer.dCustomers ? customer.dCustomers.sort((a, b) => (a.name < b.name ? 1 : -1)) : []));

export const selectCurrentCustomer = createSelector([selectCustomer], (customer) => customer.customer);

export const selectPreviewCustomer = (customersId) => createSelector([selectCustomer], (customer) => getCustomer(customersId, customer.customers));
