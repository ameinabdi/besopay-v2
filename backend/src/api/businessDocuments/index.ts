export default (app) => {
  app.post(
    `/tenant/:tenantId/business-documents`,
    require('./businessDocumentsCreate').default,
  );
  app.put(
    `/tenant/:tenantId/business-documents/:id`,
    require('./businessDocumentsUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/business-documents/import`,
    require('./businessDocumentsImport').default,
  );
  app.delete(
    `/tenant/:tenantId/business-documents`,
    require('./businessDocumentsDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/business-documents/autocomplete`,
    require('./businessDocumentsAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/business-documents`,
    require('./businessDocumentsList').default,
  );
  app.get(
    `/tenant/:tenantId/business-documents/:id`,
    require('./businessDocumentsFind').default,
  );
};
