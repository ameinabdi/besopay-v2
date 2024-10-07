import { createSelector } from 'reselect';

const selectRaw = (state) => state.roles.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const rolesViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default rolesViewSelectors;
