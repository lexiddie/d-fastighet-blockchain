import { createSelector } from 'reselect';

const selectAuthentication = (state) => state.authentication;

export const selectAccount = createSelector([selectAuthentication], (authentication) => authentication.account);

export const selectIsSignIn = createSelector([selectAuthentication], (authentication) => authentication.isSignIn);

export const selectIsInvalid = createSelector([selectAuthentication], (authentication) => authentication.isInvalid);

export const selectError = createSelector([selectAuthentication], (authentication) => authentication.errorMessage);

export const selectOrgId = createSelector([selectAuthentication], (authentication) => (authentication.account ? authentication.account.orgId : null));

export const selectOrgKey = createSelector([selectAuthentication], (authentication) => (authentication.account ? authentication.account.orgKey : null));
