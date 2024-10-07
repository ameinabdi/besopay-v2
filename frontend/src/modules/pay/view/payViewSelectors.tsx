import { createSelector } from 'reselect';

const selectRaw = (state) => state.pay.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectCheckout = createSelector(
  [selectRaw],
  (raw) => raw.checkout,
);

const selectCheckoutLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.checkoutLoading),
);

const payViewSelectors = {
  selectLoading,
  selectRecord,
  selectCheckout,
  selectCheckoutLoading,
  selectRaw,

};

export default payViewSelectors;
