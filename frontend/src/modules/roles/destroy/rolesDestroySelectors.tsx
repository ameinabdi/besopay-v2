import { createSelector } from 'reselect';

const selectRaw = (state) => state.roles.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const rolesDestroySelectors = {
  selectLoading,
};

export default rolesDestroySelectors;
