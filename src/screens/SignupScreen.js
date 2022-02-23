import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableWithoutFeedback, Keyboard, ActivityIndicator, ScrollView, KeyboardAvoidingView, Image, Switch, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { vw, vh } from '../constant';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default function SignupScreen(props) {
    const [fullName, setFullName] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [cpassword, setcpassword] = React.useState('');
    const [email, setemail] = React.useState('');
    const [phoneno, setphoneno] = React.useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [loaderr, setLoader] = useState(false)

    //    testing:

    const signupUser = () => {

        if (phoneno.length < 10) {
            alert('invalid numbers');
        }
        if (password == "" || cpassword == "" || email == "" || fullName == "" || phoneno == "") {
            alert("filled all the entry ")
        }
        else if (phoneno.length < 10) {
            alert('invalid numbers');
        }

        else {


            if (password == cpassword) {
              AsyncStorage.getItem('device_token', (err, device_token) => {
                  if (device_token) {

                    setLoader(true)
                    var postData = {
                        name: fullName,
                        email: email,
                        password: password,
                        phonenumber: phoneno,
                        deviceToken: device_token
                    }

                    axios.post("https://hitsofficialuae.com/lgm/api/user/index", postData).then(res => {
                        console.log(res, "RESPONSEEEEE");
                        if (res.data.success) {
                            setFullName("")
                            setcpassword("")
                            setpassword("")
                            setemail("")
                            setphoneno("")
                            setIsEnabled(false)
                            props.navigation.navigate("VerifyIdentify", { "emailAddress": email })
                            setLoader(false)
                        } else {
                            alert(res.data.errorDetails)
                            setLoader(false)
                            // props.navigation.navigate("VerifyIdentify", { "emailAddress": email })

                        }


                    }).catch(err => {
                        console.log(err, "Errorrr");
                        alert(err.message)
                        setLoader(false)
                    })
                  }});





            } else {
                alert('password not matched')
            }

        }
    }

    const renderButton = () => {
        if (loaderr) {
            return (
                <View style={{ marginVertical:20 }}>
                    <ActivityIndicator color="black" size="small" />
                </View>
            )
        }
        else {
            return (
                <View style={{ marginVertical:20}}><TouchableOpacity onPress={() => { signupUser() }} style={{ width: vh * 0.45, borderRadius: 20, backgroundColor: "#333" }}>
                    <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>Signup</Text>
                </TouchableOpacity></View>
            )
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>

                        <ImageBackground source={require('../assets/loginbb.png')} resizeMode='cover' style={{ alignItems: "center",  width:vw*0.99 , height:vh*1.13 }}>
                        <View style={{  padding: 20, marginRight: vw * 0.65, }}>
                            <TouchableOpacity onPress={() => { props.navigation.navigate("SignupDetails") }} >
                                <Image source={require('../assets/back.png')} style={{ height: 10, width: 30, marginRight: 20, padding: 10, }} />
                            </TouchableOpacity>
                        </View>


                            <View style={{ marginVertical:10 }}>
                                <Text style={{ fontWeight: "bold", color: '#BC922E' }}>HELLO,</Text>
                                <Text style={{ fontWeight: "bold", color: '#000', fontSize: 24, marginBottom: 25 }}>Sign Up!</Text>
                                <View style={{padding:5,flexDirection:'column'}}>
                                    <View style={{marginVertical:5}}>
                                    <TextInput
                                        mode="outlined"
                                        label="Full Name"
                                        placeholder="Alice Jack"
                                        borderColor="false"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{
                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.45,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={txt => { setFullName(txt) }}
                                        value={fullName}
                                    />
                                    </View>
                                    <View style={{marginVertical:5}}>
                                    <TextInput
                                        mode="outlined"
                                        label="Email Address"
                                        placeholder="alicejack@gmail.com"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}

                                        style={{
                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.45,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={setemail}
                                        value={email}
                                    />
                                    </View>
                                    <View style={{marginVertical:5}}>
                                    <TextInput
                                        mode="outlined"
                                        label="Phone Number"
                                        placeholder="+1 000 000 0000"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{
                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.45,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        maxLength={10}
                                        minLength={10}
                                        keyboardType="numeric"
                                        onChangeText={setphoneno}
                                        value={phoneno}

                                    />
                                    </View>
                                    <View style={{marginVertical:5}}>

                                    <TextInput
                                        mode="outlined"
                                        label="Password"
                                        placeholder="*******"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{
                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.45,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={setpassword}
                                        maxLength={16}
                                        value={password}
                                        secureTextEntry={true}
                                    />
                                    </View>
                                    <View style={{marginVertical:5}}>
                                    <TextInput
                                        mode="outlined"
                                        label="Confirm your password"
                                        placeholder="*******"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{
                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.45,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={setcpassword}
                                        maxLength={16}
                                        value={cpassword}
                                        secureTextEntry={true}
                                    />
                                    </View>
                                    </View>


                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
                                    <Switch
                                        // style={{marginRight:30}}
                                        trackColor={{ false: "#A2A2A2", true: "#A2A2A2" }}
                                        thumbColor={isEnabled ? "#BC922E" : "#2D240E"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                    <Text style={{ marginRight: vh * 0.15, fontFamily: 'Railway' }}>I accept the policy and terms</Text>

                                </View>

                                {renderButton()}

                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ color: '#000' }}>Already have account?</Text>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate("Login") }} ><Text style={{ color: '#BC922E' }}> Login </Text></TouchableOpacity>
                                </View>


                        </ImageBackground>


                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    }
});
