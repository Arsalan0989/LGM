import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
import { vw, vh } from '../constant'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { axiosClient } from './client';
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
  const [loaderr, setLoader] = useState(false)
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [photo, setphoto] = useState('');
  const [data, setdata] = useState('');



  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user, 'Userrrrrrrrrrr data');
      setname(userInfo.user.name)
      setemail(userInfo.user.email)
      setphoto(userInfo.user.photo)

      setLoader(true)
      AsyncStorage.getItem('device_token', (err, device_token) => {
        if (device_token) {

          var postData = {

            email: email,
            firstname: name,
            laststname: "",
            image: photo,
          }
          console.log(postData);

          axiosClient.post("/auth/sociallogin", postData).then(res => {
            if (res.data.error == "") {
              try {
                AsyncStorage.setItem("is_loggedin", '1')
                console.log("fdsfsdfsdgsdf==========", res.data.customer_id);
                AsyncStorage.setItem("role_id", res.data.customer_id)
                AsyncStorage.setItem("modal_box", "0")
                AsyncStorage.setItem("user", JSON.stringify(res.data))
                // props.navigation.replace("myTab")

                setLoader(false)

              } catch (e) {
                console.log(e) // saving error
              }
            } else {
              alert(res.data.error)
              setLoader(false)
            }

          }).catch(err => {
            console.log(err, "Errorrr");
            alert(err.message)
            setLoader(false)
          })

        }
      });



      console.log('====================================');
      console.log(name, 'name')
      console.log(email, 'email')
      console.log(photo, 'photo');
      console.log('====================================');
      setdata(userInfo);
      console.log(data, 'dataaaaaaaaaa')
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
  }, []);




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

            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: vh * 0.08 }}>
              <Text style={{ color: '#000', fontFamily: 'Railway', fontWeight: '600', fontSize: 15 }}>
                Already have account?
              </Text>
              <TouchableOpacity onPress={() => { props.navigation.navigate("Login") }}><Text style={{ color: '#CCA42B', fontFamily: 'Railway', fontSize: 15, marginHorizontal: 5, textDecorationLine: 'underline', }}>login</Text></TouchableOpacity>
            </View>
          </View>



        </ImageBackground>

      </View>
    </SafeAreaView>
  )
}
