import { View, ImageBackground, Image, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vw, vh } from '../constant'
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function SorryNotification(props) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
    <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh,  }}>

        <View style={{  borderRadius: 26, marginVertical: vh * 0.30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',  height: vh*0.25, width: vw*0.90, shadowColor: "#000", elevation: 10, }}>
          
            <Image source={require('../assets/notification.png')} style={{ height: 50, width: 40, marginEnd: '60%', marginBottom: '40%' }} />
          
            <View style={{position: 'absolute', top: 0, left: 0, right: 0, marginLeft: '14%', marginTop: '13%' }}>
                <Text style={{ color: '#D1A82A', fontWeight: 'bold', fontSize: 15 }}>SORRY NO NOTIFICATIONS </Text>
                <Text style={{ color: '#D1A82A', fontWeight: 'bold', fontSize: 15,padding:3, }}>FOR NOW PLEASE </Text>
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 28, }}>Signup/Sign-In</Text>
                <Text style={{ color: '#000', fontWeight: '500', fontSize: 15,padding:3 }}>To Receive Notifications</Text>

            </View>

            <View style={{ marginBottom:vh*0.02 }}>
                <TouchableHighlight onPress={()=>{props.navigation.navigate('SignupDetails')}} style={{ width: vh * 0.44, height: 45, borderRadius: 20, backgroundColor: "#333" }}>
                    <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>SIGNUP</Text>
                </TouchableHighlight>
            </View>

        </View>
    </ImageBackground>
</SafeAreaView>

  );
}
