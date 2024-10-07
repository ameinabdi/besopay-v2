import { createSelector } from 'reselect';

const selectRaw = (state) => state.productOptions.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const productOptionsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default productOptionsViewSelectors;
