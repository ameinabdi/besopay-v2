import { createSelector } from 'reselect';

const selectRaw = (state) => state.paymentLink.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const paymentLinkDestroySelectors = {
  selectLoading,
};

export default paymentLinkDestroySelectors;
