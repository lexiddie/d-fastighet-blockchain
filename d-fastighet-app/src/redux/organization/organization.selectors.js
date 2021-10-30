import { createSelector } from 'reselect';
import { getOrganization } from './organization.utils';

const selectOrganization = (state) => state.organization;

export const selectOrganizations = createSelector([selectOrganization], (organization) => (organization.organizations ? organization.organizations : []));

export const selectIsSearch = createSelector([selectOrganization], (organization) => (organization.searchKey === '' ? false : true));

export const selectSearchOrganizations = createSelector([selectOrganization], (organization) =>
  organization.dOrganizations ? organization.dOrganizations.sort((a, b) => (a.name < b.name ? 1 : -1)) : []
);

export const selectCurrentOrganization = createSelector([selectOrganization], (organization) => organization.organization);

export const selectPreviewOrganization = (organizationId) => createSelector([selectOrganization], (organization) => getOrganization(organizationId, organization.organizations));
