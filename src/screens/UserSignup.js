import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { vw, vh } from '../constant'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
export default function UserSignup(props) {


  GoogleSignin.configure({
    scopes: ['profile', 'email'], // [Android] what API you want to access on behalf of the user, default is email and profile
    webClientId: '248895029063-rqi26a26lnbiivk3hjl5m30u4pncf50r.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('not cancel')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('not progress')
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('not available')
        // play services not available or outdated
      } else {
        console.log(error)
        // some other error happened
      }
    }
  };




  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
      webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, []);

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
      <View style={{ flex: 1, }}>
        <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, justifyContent: "space-between" }}>

          <Image source={require('../assets/signuplogo.png')} resizeMode='cover' style={{ height: 200, width: 170, marginTop: 50 }} />


          <View style={{ marginBottom: vh * 0.355, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", color: '#000' }}>Sign Up!</Text>
            <Text style={{ fontWeight: "bold", color: '#000', fontSize: 24, marginBottom: 25 }}>It's easier to sign up now</Text>

            <TouchableOpacity onPress={_signIn} style={{ borderRadius: 20, paddingHorizontal: 10, borderWidth: 0, backgroundColor: "#DB4437" }}>
              <Text style={{ color: "white", paddingHorizontal: 70, paddingVertical: 12, fontWeight: "bold" }}>CONTINUE WITH GOOGLE</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { props.navigation.navigate("SignupScreen") }} style={{ borderColor: '#A2A2A2', paddingHorizontal: 12, borderWidth: 1, borderRadius: 20, backgroundColor: "white", marginVertical: 10 }}>
              <Text style={{ color: "#333", paddingHorizontal: 70, paddingVertical: 12, fontWeight: "bold" }}>I'LL USE EMAIL OR PHONE</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: vh * 0.15 }}>
              {/* <TouchableOpacity>
                            <Image source={require('../assets/twitter.png')} style={{ height: 50, width: 50 }} />
                        </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={_signIn}>
                <Image source={require('../assets/google-plus.png')} style={{ height: 50, width: 50 }} />
              </TouchableOpacity> */}
              {/* <TouchableOpacity>
                            <Image source={require('../assets/linkedin.png')} style={{ height: 50, width: 50 }} />
                        </TouchableOpacity> */}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: vh * 0.08 }}>
              <Text style={{ color: '#000', fontFamily: 'Railway', fontWeight: '600' }}>
                Already have account?
              </Text>
              <TouchableOpacity onPress={() => { props.navigation.navigate("Login") }}><Text style={{ color: '#CCA42B', fontFamily: 'Railway' }}>login</Text></TouchableOpacity>
            </View>
          </View>



        </ImageBackground>

      </View>
    </SafeAreaView>
  )
}
