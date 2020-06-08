/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, connect } from 'react-redux'
import { store, persistor } from './src/redux';
import Home from './src/Screens/Home/Home';
import WallPaper from './src/Screens/Wallpaper/wallpaper';
import AppContainer from './src/Navigation/Navigation'
import { colors } from './src/configs/colors';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <>
          <StatusBar barStyle="light-content" backgroundColor={colors.background} />
          {/* <WallPaper/> */}
          {/* <Home/> */}
          <AppContainer />
        </>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
