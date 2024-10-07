import { createSelector } from 'reselect';

const selectRaw = (state) => state.banks.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const banksDestroySelectors = {
  selectLoading,
};

export default banksDestroySelectors;
