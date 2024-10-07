import { createSelector } from 'reselect';

const selectRaw = (state) => state.accountcenter.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const accountcenterDestroySelectors = {
  selectLoading,
};

export default accountcenterDestroySelectors;
