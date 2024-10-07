import { createSelector } from 'reselect';

const selectRaw = (state) => state.invoice.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const invoiceViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default invoiceViewSelectors;
