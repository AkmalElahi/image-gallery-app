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
  Alert
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
import CustomFooter from './src/Components/CustomFooter/Footer';
import NavigaationService from './src/Navigation/NavigaationService';
import { Root } from 'native-base';
import { getUniqueId, } from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';


// const navigation = React.createRef()
// let currentRoute = 'home'
// function _getCurrentRouteName(navState) {

//   if (navState.hasOwnProperty('index')) {
//     _getCurrentRouteName(navState.routes[navState.index])
//   } else {
//     currentRoute = navState.routeName
//     console.log("Current Route Name:", navState.routeName)
//     // can then save this to the state (I used redux)
//     // store.dispatch(setCurrentRouteName(navState.routeName))
//   }

// }
// let currentRouteName = 'home'
// function getActiveRouteName(navigationState) {
//   if (!navigationState) {
//     return null;
//   }
//   const route = navigationState.routes[navigationState.index];
//   // dive into nested navigators
//   if (route.routes) {
//     return getActiveRouteName(route);
//   }
//   console.log(route.routeName)
//   // return route.routeName;

// }

const App = () => {
  const setDeviceId = async () => {
    const deviceID = getUniqueId()
    await AsyncStorage.setItem('deviceID', deviceID);
  }
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken()
    }
  }
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  }
  useEffect(() => {
    setDeviceId()
    requestUserPermission()
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage,
    //   );
      // Alert.alert(
      //   remoteMessage.notification.title,
      //   remoteMessage.notification.body,
      // );
    // });

    // Check whether an initial notification is available
    // messaging()
      // .getInitialNotification()
      // .then(remoteMessage => {
      //   if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );
      //     Alert.alert(
      //       remoteMessage.notification.title,
      //       remoteMessage.notification.body,
      //     );
      //   }
      // });
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    // });


    // return unsubscribe;
  }, []);


  return (
    <Root>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            <AppContainer ref={navigatorRef => {
              NavigaationService.setTopLevelNavigator(navigatorRef);
            }}
            />
          </>
        </PersistGate>
      </Provider>
    </Root>
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
