import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
import { SafeAreaView, StyleSheet, Button, ImageBackground, Image, View, Text } from 'react-native'
import { vw, vh } from '../constant';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import { notifications, NotificationMessage, Android } from 'react-native-firebase-push-notifications'


export default function SplashScreen(props) {
  useEffect(() => {

    messaging()
      .getToken()
      .then(token => {
        console.log(token, '<======== token');
        AsyncStorage.setItem("device_token", token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    messaging().onTokenRefresh(token => {
      AsyncStorage.setItem("device_token", token);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      //  navigation.navigate(remoteMessage.data.type);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          //  setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        //  setLoading(false);
      });

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    setTimeout(() => {

      AsyncStorage.getItem('user', (err, userDetails) => {
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(userDetails)
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
        if (userDetails) {
          user = JSON.parse(userDetails);
          AsyncStorage.setItem("role_id", user.role_id)
          props.navigation.navigate("myTab");
        }
        else {
          AsyncStorage.setItem("role_id", '0')
          props.navigation.navigate("SignupDetails");
        }

      });

    }, 3500)

  }, [])

  return (
    <View>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('../assets/background.gif')}
      />
    </View>
  )

};
