import { createSelector } from 'reselect';

const selectRaw = (state) => state.store.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const storeDestroySelectors = {
  selectLoading,
};

export default storeDestroySelectors;
