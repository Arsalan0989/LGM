import { View, Text, ImageBackground, TextInput, TouchableHighlight, Keyboard, Image, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { vw, vh } from '../constant'
import axios from 'axios';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-community/async-storage';
import { axiosClient } from './client';

export default function profile(props) {
    const [password, setpassword] = React.useState('');
    const [cpassword, setcpassword] = React.useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [loaderr, setLoader] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [userId, setUserId] = React.useState('');
    const [email, setemail] = useState('')
    const [mobile, setmobile] = useState('')
    const [location, setlocation] = useState('Location of dummy * address')
    const [fullname, setfullname] = useState('')
    const [profileimage, setprofileimage] = useState('')

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const getUserData = () => {
        let userDetails = null;
        try {
            AsyncStorage.getItem('user', (err, userData) => {
                if (userData) {

                    console.log("================================================>")
                    console.log(JSON.parse(userData));
                    console.log("================================================>")
                    userDetails = JSON.parse(userData)
                    let axiosConfig = {

                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                            "Access-Control-Allow-Origin": "*",
                            "Authorization": "Bearer " + userDetails.access_token,
                            "Cookie": "ci_session=2c33c56a0c53ea95f57b3ed3e827d128efe88050"
                        }
                    };
                    axiosClient.get("profile/getUserallProfileData?user_id=" + userDetails.customer_id, axiosConfig).then(res => {
                        console.log("RESPOMSEEEEEE", res.data.data.user_details);
                        console.log("userrrrr iddd", userDetails.role_id);
                        setIsLoading(false)
                        setUserId(userDetails.customer_id);
                        // setemail(res.data.data.user_details.email)
                        setemail(value => (res.data.data.user_details.email))
                        setmobile(value => (res.data.data.user_details.mobileNumber))
                        setlocation(value => (res.data.data.user_details.location))

                        setfullname(value => (res.data.data.user_details.fullname))
                        setprofileimage(value => ({ "uri": res.data.data.user_details.profile_image }))

                    }).catch(err => {
                        console.log("ERRRRRRRrrrrrrrrrrrr", err);
                    })
                } else {
                    console.log(err)
                }
            });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }







    }

    useEffect(() => {
        getUserData();
    }, [])


    const changepassword = () => {


        if (password == "" || cpassword == "") {
            alert("filled all the entry ")
        }


        else {


            if (password == cpassword) {
                setLoader(true)
                var postData = {
                    user_id: userId,
                    user_pwd: password,

                }

                axiosClient.post("auth/updatePwd", postData).then(res => {
                    console.log(res, "RESPONSEEEEE");
                    if (res.data.pwdResetStatus == 'true') {

                        setcpassword("")
                        setpassword("")

                        setLoader(false)
                    } else {
                        alert(res.data.userRegMessage)
                        setLoader(false)

                    }


                }).catch(err => {
                    console.log(err, "Errorrr");
                    setLoader(false)
                })


            } else {
                alert('password not matched')
            }

        }
    }



    const renderButton = () => {
        if (loaderr) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <ActivityIndicator color="black" size="small" />
                </View>
            )
        }
        else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <TouchableHighlight onPress={() => { changepassword() }} style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333" }}>
                        <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }} >UPDATE PASSWORD</Text>
                    </TouchableHighlight >
                </View>
            )
        }
    }
    {
        return isLoading ? <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator color="black" size="large" />
            </View>
             : (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>



                    <ImageBackground source={require('../assets/profile1.1.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh * 0.50, }}>

                        <View style={{ marginRight: vw * 0.8, padding: 20 }} >
                            <TouchableOpacity onPress={() => { props.navigation.navigate("myTab") }}
                                style={{
                                    backgroundColor: '#fff',
                                    width: vw * 0.10,
                                    borderColor: '#A2A2A2',
                                    borderWidth: 2,
                                    overflow: 'visible',
                                    shadowColor: '#A2A2A2',
                                    shadowRadius: 10,
                                    shadowOpacity: 2,
                                    height: vh * 0.05,
                                    borderRadius: 20
                                }}>
                                <Image source={require('../assets/menu.png')} style={{ height: vh * 0.023, width: vw * 0.050, padding: 7, marginLeft: 7, marginTop: 7 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginVertical: vh * 0.04 }}>

                            <ImageBackground imageStyle={{ borderRadius: 85 }} source={profileimage} style={{ height: vh * 0.25, width: vw * 0.50, }} >
                                <TouchableOpacity onPress={() => { props.navigation.navigate("editprofile") }} >
                                    <View style={{ marginTop: vh * 0.175, marginLeft: vh * 0.14 }}>
                                        <Image source={require('../assets/group.png')} style={{ height: vh * 0.11, width: vw * 0.22 }} />
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>



                        </View>

                        <View style={{ alignItems: 'center', marginVertical: vh * -0.02 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>
                                {fullname}
                            </Text>
                            <Text style={{ fontSize: 16, color: '#A2A2A2' }}>
                                {email}
                            </Text>
                        </View>
                    </ImageBackground>



                    <View style={{ flexDirection: 'row', marginVertical: vh * 0.01, alignItems: 'flex-start' }}>
                        <View style={{ flex: 2.75, alignItems: 'center' }}>
                            <Image source={require('../assets/email.png')} style={{ height: 16, width: 16, marginTop: vh * 0.01 }} />
                        </View>
                        <View style={{ flex: 7, }}>
                            <Text style={{ fontSize: 16, color: '#000', }}>
                                Email
                            </Text>
                            <Text style={{ fontSize: 14, color: '#A2A2A2' }}>
                                {email}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: vh * 0.01, alignItems: 'flex-start' }}>
                        <View style={{ flex: 2.75, alignItems: 'center' }}>
                            <Image source={require('../assets/mobile.png')} style={{ height: 16, width: 16, marginTop: vh * 0.01 }} />
                        </View>
                        <View style={{ flex: 7, }}>
                            <Text style={{ fontSize: 16, color: '#000', }}>
                                Mobile Number
                            </Text>
                            <Text style={{ fontSize: 14, color: '#A2A2A2' }}>
                                {mobile}
                            </Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: vh * 0.01, alignItems: 'flex-start' }}>
                        <View style={{ flex: 2.75, alignItems: 'center' }}>
                            <Image source={require('../assets/location.png')} style={{ height: 19, width: 16, marginTop: vh * 0.01 }} />
                        </View>
                        <View style={{ flex: 7 }} >
                            <Text style={{ fontSize: 16, color: '#000', }}>
                                Location
                            </Text>
                            <Text style={{ fontSize: 14, color: '#A2A2A2' }}>
                                {location}
                            </Text>
                        </View>
                    </View>



                    <TouchableOpacity onPress={toggleModal} style={{ flexDirection: 'row', marginVertical: vh * 0.01, alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <View style={{ flex: 2.75, alignItems: 'center' }}>
                                <Image source={require('../assets/password.png')} style={{ height: 19, width: 16, marginTop: vh * 0.01, }} />
                            </View>
                            <View style={{ flex: 7 }} >
                                <Text style={{ fontSize: 14, color: '#A2A2A2' }}>

                                </Text>
                                <Text style={{ marginTop: -2.5,fontSize: 16, color: '#000', }}>
                                    Password Update
                                </Text>

                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('faq') }} style={{ flexDirection: 'row', marginVertical: vh * 0.01, alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <View style={{ flex: 2.75, alignItems: 'center' }}>
                                <Image source={require('../assets/location.png')} style={{ height: 19, width: 16, marginTop: vh * 0.01, }} />
                            </View>
                            <View style={{ flex: 7 }} >
                                <Text style={{ fontSize: 14, color: '#A2A2A2' }}>

                                </Text>
                                <Text style={{ marginTop: -2.5, fontSize: 16, color: '#000', }}>
                                    FAQ's
                                </Text>

                            </View>
                        </View>
                    </TouchableOpacity>



                    <View style={{ position: 'absolute', bottom: 0 }}>

                        <TouchableOpacity onPress={() => {
                            AsyncStorage.setItem("is_loggedin", "0")
                            AsyncStorage.setItem("user", "")
                            props.navigation.navigate("SignupDetails")
                        }}
                            style={{
                                height: 40,
                                width: vw * 0.99,
                                color: 'red',
                                borderColor: '#F9FAFA',
                                borderWidth: 2
                            }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', textAlign: 'center', paddingVertical: 5 }}>
                                LOGOUT
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Modal isVisible={isModalVisible} >
                        <View style={{ elevation: 10, backgroundColor: '#fff', borderWidth: 2, borderColor: '#F9FAFA', borderRadius: 22 }}>
                            <View style={{ marginLeft: 10, padding: 5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#BC922E', fontFamily: 'Railway' }}>
                                        CREATE NEW
                                    </Text>
                                    <TouchableHighlight onPress={(toggleModal)} style={{ position: 'absolute', right: 1 }}>
                                        <Image source={require('./../assets/close2.png')} style={{ height: 20, width: 15, }} />
                                    </TouchableHighlight>
                                </View>
                                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}>
                                    Password
                                </Text>
                            </View>

                            <View style={{}}>
                                <TextInput
                                    style={{
                                        color: '#000',
                                        height: 40,
                                        borderRadius: 20,
                                        margin: 12,
                                        borderColor: '#A2A2A2',
                                        borderWidth: 1,
                                        padding: 10,
                                        width: vh * 0.4,
                                        fontSize: 15,
                                        backgroundColor: '#fff'
                                    }}
                                    onChangeText={setpassword}
                                    maxLength={16}
                                    value={password}
                                    placeholder=" New Password"
                                    placeholderTextColor='#A2A2A2'
                                    secureTextEntry={true}
                                />
                                <View style={{ marginLeft: vw * 0.04, marginBottom: 10 }}>
                                    <Text style={{ color: '#A2A2A2', fontSize: 12 }}> password must be at least 8 characters.</Text>
                                </View>
                                <TextInput
                                    style={{
                                        color: '#000',
                                        height: 40,
                                        borderRadius: 20,
                                        margin: 12,
                                        borderColor: '#A2A2A2',
                                        borderWidth: 1,
                                        padding: 10,
                                        width: vh * 0.4,
                                        fontSize: 15,
                                        backgroundColor: '#fff'
                                    }}
                                    onChangeText={setcpassword}
                                    maxLength={16}
                                    value={cpassword}
                                    placeholder="Confirm your password"
                                    placeholderTextColor='#A2A2A2'
                                    secureTextEntry={true}
                                />
                                <View style={{ marginLeft: vw * 0.05, marginBottom: 10 }}>
                                    <Text style={{ color: '#A2A2A2', fontSize: 12 }}>
                                        both passwords must match.
                                    </Text>
                                </View>


                            </View>

                            {renderButton()}

                        </View>
                    </Modal>

                </SafeAreaView>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
                                }
}
