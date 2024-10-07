import { createSelector } from 'reselect';

const selectRaw = (state) => state.businessAccounts.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const businessAccountsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default businessAccountsViewSelectors;
