import { createSelector } from 'reselect';

const selectRaw = (state) => state.locations.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const locationsDestroySelectors = {
  selectLoading,
};

export default locationsDestroySelectors;
