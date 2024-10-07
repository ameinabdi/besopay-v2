import { createSelector } from 'reselect';

const selectRaw = (state) => state.country.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const countryViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default countryViewSelectors;
