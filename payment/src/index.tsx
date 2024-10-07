import React from 'react';
import ReactDOM from 'react-dom/client';
import { i18n, init as i18nInit } from 'src/i18n';
import SettingsService from './modules/settings/settingsService';

(async function () {
  const theme = SettingsService.applyThemeFromTenant();
  await i18nInit();

  document.title = i18n('app.title');
  const App = require('./App').default;
  // @ts-ignore
  ReactDOM.createRoot(document.getElementById('root')).render(<App theme={theme}/>);
})();
