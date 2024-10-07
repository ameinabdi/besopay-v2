import { createSelector } from 'reselect';

const selectRaw = (state) => state.permission.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const permissionViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default permissionViewSelectors;
