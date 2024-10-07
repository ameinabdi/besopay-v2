import { createSelector } from 'reselect';

const selectRaw = (state) => state.country.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const countryDestroySelectors = {
  selectLoading,
};

export default countryDestroySelectors;
