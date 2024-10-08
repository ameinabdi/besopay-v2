import { createSelector } from 'reselect';

const selectRaw = (state) => state.payment.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const paymentViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default paymentViewSelectors;
