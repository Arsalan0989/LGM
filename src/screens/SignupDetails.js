import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { vw, vh } from '../constant'
import AsyncStorage from '@react-native-community/async-storage';

export default function SignupDetails(props) {
    return (

        <SafeAreaView style={{ flex: 1, alignItems: "center", height: vh }}>
            {/* <View style={{ alignItems: "center", width: "100%", height: vh, justifyContent: "space-between" }}> */}
            <ImageBackground source={require('../assets/bgimg.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, justifyContent: 'space-around' }}>
                <Image source={require('../assets/logo.png')} resizeMode='contain' style={{ height: vh * 0.4, width: vw * 0.5, marginTop: 10 }} />


                <View style={{ marginTop: vh * 0.10, alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: '#000' }}>START FOR FREE</Text>
                    <Text style={{ fontWeight: "bold", color: '#000', fontSize: 24, marginBottom: vh * 0.02 }}>Signup on LGM</Text>

                    <TouchableOpacity onPress={() => { props.navigation.navigate("UserSignup") }} style={{ borderRadius: 20, backgroundColor: "#333" }}>
                        <Text style={{ color: "white", paddingHorizontal: 80, paddingVertical: 12, fontWeight: "bold" }}>SIGNUP AS USER</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate("SignupAsPunter") }} style={{ borderRadius: 20, backgroundColor: "white", marginVertical: 10 }}>
                        <Text style={{ color: "#333", paddingHorizontal: 70, paddingVertical: 12, fontWeight: "bold" }}>SIGNUP AS PUNTER</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}}>
                            <Text style={{  fontWeight: "bold", textDecorationLine: 'underline', color: '#000', fontFamily: 'Railway' }} >
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: "bold", color: '#000', fontFamily: 'Railway',marginHorizontal:5}}>
                            OR
                        </Text>
                        <TouchableOpacity onPress={() => {
                            AsyncStorage.setItem("role_id", '0')
                            AsyncStorage.setItem("modal_box", '0')
                            props.navigation.navigate("myTab")
                        }} style={{}} >
                            <Text style={{ fontWeight: "bold", color: '#000', fontFamily: 'Railway' }}>CONTINUE AS A GUEST</Text>
                        </TouchableOpacity>
                    </View>



                </View>

                {/* </View> */}
            </ImageBackground>

        </SafeAreaView>

    )
}
