export default (app) => {
  app.post(
    `/pay`,
    require('./payCreate').default,
  );
  app.put(
    `/pay/:id`,
    require('./payUpdate').default,
  );
  app.post(
    `/pay/import`,
    require('./payImport').default,
  );
  app.delete(
    `/pay`,
    require('./payDestroy').default,
  );
  app.get(
    `/pay/autocomplete`,
    require('./payAutocomplete').default,
  );
  app.get(
    `/payment`,
    require('./payList').default,
  );
  app.get(
    `/pay/:id`,
    require('./payFind').default,
  );
  app.post(
    `/pay-with-zaad`,
    require('./payWithZaad').default,
  );

  app.post(
    `/pay-with-edahab`,
    require('./payWithEdahab').default,
  );
  app.post(
    `/encrypt-payload`,
    require('./encrypt').default,
  );
  app.get(
    `/dencrypt-payload/:token`,
    require('./dencypt').default,
  );
};
