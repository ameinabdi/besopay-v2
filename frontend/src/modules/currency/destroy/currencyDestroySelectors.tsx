import { createSelector } from 'reselect';

const selectRaw = (state) => state.currency.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const currencyDestroySelectors = {
  selectLoading,
};

export default currencyDestroySelectors;
