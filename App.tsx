import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigator';
import {persistor, store} from './src/redux/store';
import {COLORS} from './src/utils/constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
  },
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </PersistGate>
  </Provider>
);

export default App;
