import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { vw, vh } from '../constant'
export default function UserSignup(props) {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
                <View style={{ flex: 1, }}>
            <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, justifyContent: "space-between" }}>

                <Image source={require('../assets/signuplogo.png')} resizeMode='cover' style={{ height: 200, width: 170, marginTop: 50 }} />


                <View style={{ marginBottom: vh * 0.355, alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", color: '#000' }}>Sign Up!</Text>
                    <Text style={{ fontWeight: "bold", color: '#000', fontSize: 24, marginBottom: 25 }}>It's easier to sign up now</Text>

                    <TouchableOpacity onPress={() => { props.navigation.navigate("faq") }} style={{ borderRadius: 20, paddingHorizontal: 10, borderWidth: 1, backgroundColor: "#1877F2" }}>
                        <Text style={{ color: "white", paddingHorizontal: 70, paddingVertical: 12, fontWeight: "bold" }}>CONTINUE WITH FACEBOOK</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate("SignupScreen") }} style={{ borderColor: '#A2A2A2', paddingHorizontal: 12, borderWidth: 1, borderRadius: 20, backgroundColor: "white", marginVertical: 10 }}>
                        <Text style={{ color: "#333", paddingHorizontal: 70, paddingVertical: 12, fontWeight: "bold" }}>I'LL USE EMAIL OR PHONE</Text>
                    </TouchableOpacity>
                    <View style={{flex:1, flexDirection: 'row', marginTop:vh*0.15 }}>
                        <TouchableOpacity>
                            <Image source={require('../assets/twitter.png')} style={{ height: 50, width: 50 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../assets/google-plus.png')} style={{ height: 50, width: 50 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../assets/linkedin.png')} style={{ height: 50, width: 50 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex:1,flexDirection: 'row',marginBottom:vh*0.08  }}>
                        <Text style={{ color: '#000',fontFamily:'Railway',fontWeight:'600' }}>
                            Already have account?
                        </Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("Login") }}><Text style={{ color: '#CCA42B' ,fontFamily:'Railway'}}>login</Text></TouchableOpacity>
                    </View>
                </View>



            </ImageBackground>

            </View>
        </SafeAreaView>
    )
}
