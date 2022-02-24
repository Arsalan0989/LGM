import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { vw, vh } from '../constant'
import AsyncStorage from '@react-native-community/async-storage';

export default function SignupDetails(props) {
    return (
        <ImageBackground source={require('../assets/bgimg.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, justifyContent: "space-between" }}>
            <SafeAreaView style={{ flex: 1, alignItems: "center", height: vh, justifyContent: "space-between" }}>
                {/* <View style={{ alignItems: "center", width: "100%", height: vh, justifyContent: "space-between" }}> */}

                <Image source={require('../assets/logo.png')} resizeMode='cover' style={{ height: 289, width: 198, marginTop: 50 }} />


                <View style={{ marginBottom: 0, alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: '#000' }}>START FOR FREE</Text>
                    <Text style={{ fontWeight: "bold", color: '#000', fontSize: 24, marginBottom: 25 }}>Signup on LGM</Text>

                    <TouchableOpacity onPress={() => { props.navigation.navigate("UserSignup") }} style={{ borderRadius: 20, backgroundColor: "#333" }}>
                        <Text style={{ color: "white", paddingHorizontal: 80, paddingVertical: 12, fontWeight: "bold" }}>SIGNUP AS USER</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate("SignupAsPunter") }} style={{ borderRadius: 20, backgroundColor: "white", marginVertical: 10 }}>
                        <Text style={{ color: "#333", paddingHorizontal: 70, paddingVertical: 12, fontWeight: "bold" }}>SIGNUP AS PUNTER</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        AsyncStorage.setItem("role_id", '0')
                        props.navigation.navigate("myTab")
                    }} style={{ marginVertical: 10 }} >
                        <Text style={{ fontWeight: "bold", color: '#000', fontFamily: 'Railway' }}>CONTINUE AS A GUEST</Text>
                    </TouchableOpacity>

                </View>

                {/* </View> */}


            </SafeAreaView>
        </ImageBackground>
    )
}
