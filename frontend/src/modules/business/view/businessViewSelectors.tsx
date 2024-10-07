import { createSelector } from 'reselect';

const selectRaw = (state) => state.business.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const businessViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default businessViewSelectors;
