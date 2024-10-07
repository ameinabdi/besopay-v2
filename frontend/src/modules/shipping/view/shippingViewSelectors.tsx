import { createSelector } from 'reselect';

const selectRaw = (state) => state.shipping.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const shippingViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default shippingViewSelectors;
