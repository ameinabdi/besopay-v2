export default (app) => {
  app.post(
    `/tenant/:tenantId/store`,
    require('./storeCreate').default,
  );
  app.put(
    `/tenant/:tenantId/store/:id`,
    require('./storeUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/store/import`,
    require('./storeImport').default,
  );
  app.delete(
    `/tenant/:tenantId/store`,
    require('./storeDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/store/autocomplete`,
    require('./storeAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/store`,
    require('./storeList').default,
  );
  app.get(
    `/tenant/:tenantId/store/:id`,
    require('./storeFind').default,
  );
};
