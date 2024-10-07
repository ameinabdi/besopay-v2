export default (app) => {
    app.get(
      `/tenant/:tenantId/roles`,
      require('./rolesList').default,
    );
  };
  