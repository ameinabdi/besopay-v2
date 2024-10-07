import { createSelector } from 'reselect';

const selectRaw = (state) => state.business.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const businessDestroySelectors = {
  selectLoading,
};

export default businessDestroySelectors;
