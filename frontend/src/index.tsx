import React from 'react';
import ReactDOM from 'react-dom/client';
import { i18n, init as i18nInit } from 'src/i18n';
import { AuthToken } from './modules/auth/authToken';
import TenantService from './modules/tenant/tenantService';
import SettingsService from './modules/settings/settingsService';
import AuthService from 'src/modules/auth/authService';

(async function () {
  const isSocialOnboardRequested = AuthService.isSocialOnboardRequested();
  AuthToken.applyFromLocationUrlIfExists();
  await TenantService.fetchAndApply();
  if (isSocialOnboardRequested) {
    await AuthService.socialOnboard();
  }
  const theme = SettingsService.applyThemeFromTenant();
  await i18nInit();

  document.title = i18n('app.title');
  const App = require('./App').default;
  // @ts-ignore
  ReactDOM.createRoot(document.getElementById('root')).render(<App theme={theme}/>);
})();
