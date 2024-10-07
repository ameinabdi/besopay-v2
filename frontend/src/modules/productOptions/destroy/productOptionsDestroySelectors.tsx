import { createSelector } from 'reselect';

const selectRaw = (state) => state.productOptions.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const productOptionsDestroySelectors = {
  selectLoading,
};

export default productOptionsDestroySelectors;
