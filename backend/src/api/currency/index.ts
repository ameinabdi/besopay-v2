export default (app) => {
  app.post(
    `/tenant/:tenantId/currency`,
    require('./currencyCreate').default,
  );
  app.put(
    `/tenant/:tenantId/currency/:id`,
    require('./currencyUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/currency/import`,
    require('./currencyImport').default,
  );
  app.delete(
    `/tenant/:tenantId/currency`,
    require('./currencyDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/currency/autocomplete`,
    require('./currencyAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/currency`,
    require('./currencyList').default,
  );
  app.get(
    `/tenant/:tenantId/currency/:id`,
    require('./currencyFind').default,
  );
};
