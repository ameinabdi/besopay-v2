export default (app) => {
  app.get(
    `/checkout/:token`,
    require('./checkoutFind').default,
  );
};
