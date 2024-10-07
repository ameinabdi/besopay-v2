import { createSelector } from 'reselect';

const selectRaw = (state) => state.businessDocuments.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const businessDocumentsDestroySelectors = {
  selectLoading,
};

export default businessDocumentsDestroySelectors;
