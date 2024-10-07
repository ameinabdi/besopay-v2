import {
  configureStore,
  getHistory
} from 'src/modules/store';
import React from 'react';
import { Provider } from 'react-redux';   
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import { ConfigProvider } from 'antd';
import { getAntdLanguage } from 'src/i18n';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import 'antd/dist/reset.css';

const store = configureStore();

const App = (props) => {
  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#01be63',
        borderRadius: 0,
        fontSize:13,
        fontFamily:'Century Gothic'

      },
      components: {
        Button: {
          colorPrimary: '#01be63',
          algorithm: true, // Enable algorithm
          controlOutline: 'rgba(5, 145, 255, 0)'
        },
        Tabs: {
          itemActiveColor: '#01be63',
          colorBgContainer: 'white',
        },
      }
    }} locale={getAntdLanguage()}>
      <Provider store={store}>
      <HistoryRouter
              //@ts-ignore
      history={getHistory()}>
          <div style={{ margin: 0, padding: 0 }}>
           <RoutesComponent />
           </div>
      </HistoryRouter>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
