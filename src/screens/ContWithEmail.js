import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet, Keyboard, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, ImageBackground, Image, Text } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler';
import { vw, vh } from '../constant';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import { axiosClient } from './client';




export default function ContWithEmail(props) {
    const [email, setemail] = React.useState('');
    const [loaderr, setLoader] = useState(false)

    // useEffect(() => {
    //     let mydata = props.route.params
    //     setemail(mydata.emailAddress)
    // }, [])
    const forgot = () => {
        setLoader(true)
        var postData = {

            email: email,
        }
        axiosClient.post("auth/resetPwd", postData).then(res => {
            console.log(res, "RESPONSEEEEE");
            if (res.data.message == "") {
                setemail("")
                setLoader(false)
                // props.navigation.navigate("Login")


            } else {
                alert(res.data.message)
                setLoader(false)
                props.navigation.navigate("Login")  
            }

        })
            .catch(err => {
                console.log(err, "Errorrr");
                alert(err.message)
                setLoader(false)
            })
    }


    const renderButton = () => {
        if (loaderr) {
            return (
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <ActivityIndicator color="black" size="small" />
                </View>
            )
        }
        else {
            return (
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { forgot() }} style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333", alignItems: 'center', justifyContent: 'center', marginLeft: '3%' }}>
                        <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>Signup</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>

                    <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, justifyContent: "space-between" }}>

                        <View style={{ flexDirection: 'row', marginRight: 120, padding: 20 }}>
                            <TouchableOpacity onPress={() => { props.navigation.navigate("Login") }}>
                                <Image source={require('../assets/close-icon.png')} style={{ height: 17, width: 17, marginRight: 30, padding: 7, }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 17 }}>
                                Continue with Email
                            </Text>

                        </View>

                        <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                            <Image source={require('../assets/cemail.png')} resizeMode='cover' style={{ height: 200, width: 170, }} />
                            <Text style={{ alignItems: 'center', color: '#000', textAlign: 'center', marginHorizontal: vw * 0.1 }}>You will receive a 4 digit code on your registered email to verify. Please check</Text>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TextInput
                                    mode="outlined"
                                    label="Email Address"
                                    placeholder="alicejack@gmail.com"
                                    borderColor="false"
                                    theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                    style={{
                                        height: 30,
                                        padding: 10,
                                        width: vh * 0.4,
                                        fontSize: 15,
                                        backgroundColor: '#fff'
                                    }}
                                    onChangeText={setemail}
                                    value={email}
                                />

                                {renderButton()}
                            </View>


                        </View>





                    </ImageBackground>


                </SafeAreaView>
            </ScrollView>
        </TouchableWithoutFeedback>
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