export default (app) => {
  app.post(
    `/tenant/:tenantId/payment`,
    require('./paymentCreate').default,
  );
  app.put(
    `/tenant/:tenantId/payment/:id`,
    require('./paymentUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/payment/import`,
    require('./paymentImport').default,
  );
  app.delete(
    `/tenant/:tenantId/payment`,
    require('./paymentDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/payment/autocomplete`,
    require('./paymentAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/payment`,
    require('./paymentList').default,
  );
  app.get(
    `/tenant/:tenantId/payment/:id`,
    require('./paymentFind').default,
  );

  app.get(
    `/payment-config`,
    require('./paymentConfig').default,
  );

  app.get(
    `/generate-checkout`,
    require('./CheckoutGenetor').default,
  );

  app.post(
    `/pay`,
    require('./pay').default,
  );

  app.post(
    `/session-payment`,
    require('./sessionPayment').default,
  );

  app.post(
    `/success-payment`,
    require('./successPayment').default,
  );
};
