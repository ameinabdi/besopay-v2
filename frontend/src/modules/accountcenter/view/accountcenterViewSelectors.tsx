import { createSelector } from 'reselect';

const selectRaw = (state) => state.accountcenter.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const accountcenterViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default accountcenterViewSelectors;
