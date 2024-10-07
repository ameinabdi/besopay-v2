import { createSelector } from 'reselect';

const selectRaw = (state) => state.paymentLink.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const paymentLinkViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default paymentLinkViewSelectors;
