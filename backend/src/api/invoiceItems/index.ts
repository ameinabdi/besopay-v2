export default (app) => {
  app.post(
    `/tenant/:tenantId/invoice-items`,
    require('./invoiceItemsCreate').default,
  );
  app.put(
    `/tenant/:tenantId/invoice-items/:id`,
    require('./invoiceItemsUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/invoice-items/import`,
    require('./invoiceItemsImport').default,
  );
  app.delete(
    `/tenant/:tenantId/invoice-items`,
    require('./invoiceItemsDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/invoice-items/autocomplete`,
    require('./invoiceItemsAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/invoice-items`,
    require('./invoiceItemsList').default,
  );
  app.get(
    `/tenant/:tenantId/invoice-items/:id`,
    require('./invoiceItemsFind').default,
  );
};
