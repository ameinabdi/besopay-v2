import { createSelector } from 'reselect';

const selectRaw = (state) => state.invoice.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const invoiceDestroySelectors = {
  selectLoading,
};

export default invoiceDestroySelectors;
