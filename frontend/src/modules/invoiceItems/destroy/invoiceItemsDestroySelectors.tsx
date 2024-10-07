import { createSelector } from 'reselect';

const selectRaw = (state) => state.invoiceItems.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const invoiceItemsDestroySelectors = {
  selectLoading,
};

export default invoiceItemsDestroySelectors;
