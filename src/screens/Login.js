import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, Switch, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native'
import { vw, vh } from '../constant'
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { axiosClient } from './client';

export default function Login(props) {
    const [Email, setEmail] = React.useState('');
    const [password, setpassword] = React.useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [loaderr, setLoader] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const loader = () => {
        alert("loader")
    }
    const loginuser = () => {
        setLoader(true)
        AsyncStorage.getItem('device_token', (err, device_token) => {
            if (device_token) {

                var postData = {

                    email: Email,
                    password: password,
                    language: "en",
                    deviceToken: device_token,
                }
                console.log(postData);

                axiosClient.post("auth/login", postData).then(res => {
                    if (res.data.error == "") {
                        try {
                            AsyncStorage.setItem("is_loggedin", '1')
                            console.log("fdsfsdfsdgsdf==========", res.data.role_id);
                            AsyncStorage.setItem("role_id", res.data.role_id)
                            AsyncStorage.setItem("modal_box", "0")
                            AsyncStorage.setItem("user", JSON.stringify(res.data))
                            setEmail("")
                            setpassword("")
                            setIsEnabled(false)
                            props.navigation.replace("myTab")
                            // props.navigation.reset({
                            //     index: 0,
                            //     routes: [{ name: 'myTab' }],
                            // });
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


    }

    const renderButton = () => {

        if (loaderr) {
            return (
                <View style={{ marginBottom: vh * 0.50 }}>
                    <ActivityIndicator color="black" size="small" />
                </View>)
        } else {
            return (
                <View style={{ marginBottom: vh * 0.50 }}>
                    <TouchableOpacity onPress={() => { loginuser() }} style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333" }}>
                        <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>LOGIN</Text>
                    </TouchableOpacity>
                </View>)
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>

            <ImageBackground source={require('../assets/loginbb.png')} resizeMode='cover' style={{ alignItems: "center", width: vw * 0.99, height: vh * 1.1, justifyContent: 'center' }}>
                <View style={{ marginBottom: vh * 0.08, marginRight: vw * 0.65, }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("SignupDetails") }} >
                        <Image source={require('../assets/back.png')} style={{ height: 10, width: 30, marginRight: 20, padding: 10, }} />
                    </TouchableOpacity>
                </View>


                <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontWeight: 'bold', color: '#BC922E', fontFamily: 'Railway' }}>WELCOME BACK,</Text>
                    <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 24, marginBottom: 25, fontFamily: 'Railway' }}>Log In !</Text>
                    <View style={{ marginVertical: 10 }}>
                        <TextInput

                            mode="outlined"
                            label="Email Address"
                            placeholder="alicejack@gmail.com"
                            borderColor="false"
                            // placeholderTextColor="blue"
                            theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}

                            style={{
                                // textAlignVertical:  "bottom",
                                // textAlign:  "center",
                                height: 30,
                                // borderRadius: 20,
                                // margin: 12,
                                // borderColor: '#A2A2A2',
                                // borderWidth: 2,
                                padding: 10,
                                width: vh * 0.4,
                                fontSize: 15,
                                backgroundColor: '#fff'
                            }}
                            onChangeText={setEmail}
                            value={Email}
                        />
                    </View>
                    <TextInput
                        mode="outlined"
                        label="Password"
                        // placeholder="Password"
                        borderColor="false"
                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                        style={{
                            height: 30,
                            // borderRadius: 20,
                            // margin: 12,
                            // borderColor: '#A2A2A2',
                            // borderWidth: 2,
                            padding: 10,
                            width: vh * 0.4,
                            fontSize: 15,
                            backgroundColor: '#fff'
                        }}
                        onChangeText={setpassword}
                        value={password}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                    />


                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: vh * 0.01 }}>
                    <Switch

                        // style={{marginRight:30}}
                        trackColor={{ false: "#A2A2A2", true: "#A2A2A2" }}
                        thumbColor={isEnabled ? "#BC922E" : "#2D240E"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text style={{ marginRight: 60, fontFamily: 'Railway',color:'#000' }}> Remember me</Text>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("ContWithEmail") }}>
                        <Text style={{ fontFamily: 'Railway',color:'#000' }}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>

                </View>
                {renderButton()}


            </ImageBackground>


        </SafeAreaView>
    )
}
