import { createSelector } from 'reselect';

const selectRaw = (state) => state.refund.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const refundDestroySelectors = {
  selectLoading,
};

export default refundDestroySelectors;
