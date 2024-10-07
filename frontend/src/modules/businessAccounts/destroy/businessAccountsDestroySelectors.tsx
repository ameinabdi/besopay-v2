import { createSelector } from 'reselect';

const selectRaw = (state) => state.businessAccounts.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const businessAccountsDestroySelectors = {
  selectLoading,
};

export default businessAccountsDestroySelectors;
