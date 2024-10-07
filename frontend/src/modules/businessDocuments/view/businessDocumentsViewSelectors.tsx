import { createSelector } from 'reselect';

const selectRaw = (state) => state.businessDocuments.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const businessDocumentsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default businessDocumentsViewSelectors;
