import { createSelector } from 'reselect';

const selectRaw = (state) => state.invoiceItems.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const invoiceItemsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default invoiceItemsViewSelectors;
