import { createSelector } from 'reselect';

const selectRaw = (state) => state.transaction.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const transactionViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default transactionViewSelectors;
