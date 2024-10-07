import { createSelector } from 'reselect';

const selectRaw = (state) => state.banks.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const banksViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default banksViewSelectors;
