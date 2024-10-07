import { createSelector } from 'reselect';

const selectRaw = (state) => state.permission.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const permissionDestroySelectors = {
  selectLoading,
};

export default permissionDestroySelectors;
