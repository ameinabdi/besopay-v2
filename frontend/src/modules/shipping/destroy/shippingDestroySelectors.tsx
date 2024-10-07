import { createSelector } from 'reselect';

const selectRaw = (state) => state.shipping.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const shippingDestroySelectors = {
  selectLoading,
};

export default shippingDestroySelectors;
