import { View, Text, ImageBackground, ScrollView, TextInput, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { vw, vh } from '../constant';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from "react-native-image-picker";
import { axiosClient } from './client';

export default function editprofile(props) {
    const [userId, setUserId] = React.useState('');
    const [isLoading, setIsLoading] = useState(true)

    const [Email, setemail] = React.useState('');
    const [mobile, setmobile] = React.useState('');
    const [Location, setlocation] = React.useState('');
    const [profileimage, setprofileimage] = useState('');
    const [loaderr, setLoader] = useState(false)
    const [filePath, setFilePath] = useState("");
    const [access_token, setAccessToken] = useState('');

    const chooseFile = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo' + 'uri',
                includeBase64: true,
                maxHeight: 800,
                maxWidth: 800,
            },
            (response) => {
                // console.log(response.assets, "testinggggggggggggggggggg");


                let proflephotoo = ('');
                response.assets.map((item) => {

                    setFilePath(item.base64);
                    console.log("***********");
                    console.log(filePath);
                    console.log("***************");

                }
                )

            },
        );
        console.log(filePath, "testing=====================================")

    };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const update = () => {

        if (mobile.length < 10) {
            alert('invalid numbers');
        }
        if (Email == "" || mobile == "" || Location == "") {
            alert("filled all the entry ")
        }
        else if (mobile.length < 10) {
            alert('invalid numbers');
        }

        else {

            setLoader(true)
            var postData = {
                'user_id': userId,
                'email': Email,
                'phonenumber': mobile,
                'location': Location,
                'photo': filePath,
            }


            try {
                AsyncStorage.getItem('user', (err, userData) => {
                    if (userData) {


                        let axiosConfig = {

                            headers: {
                                'Authorization': access_token,
                                'Content-Type': 'application/json'
                            }
                        };

                        axiosClient.post("profile/editUserProfile", postData, axiosConfig).then(res => {
                            console.log(res.data, "RESPONSEEEEE");
                            if (res.status == "200") {
                                // setemail("")
                                // setmobile("")
                                // setlocation("")
                                setLoader(false)
                                alert(res.data.data)
                            } else {
                                alert(res.data.errorMessage)
                                setLoader(false)

                            }


                        }
                        )
                            .catch(err => {
                                console.log(err, "Errorrr");
                                alert(err.message)
                                setLoader(false)
                            })
                    } else {
                        console.log(err)
                    }
                });
            } catch (error) {
                console.log("Error retrieving data" + error);
            }



        }
    }
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
                        setIsLoading(false)
                        setUserId(value => (userDetails.customer_id))
                        setAccessToken("Bearer " + userDetails.access_token);
                        // console.log("RESPOMSEEEEEE", res.data.data.user_details);
                        setemail(value => (res.data.data.user_details.email))
                        setmobile(value => (res.data.data.user_details.mobileNumber))
                        setlocation(value => (res.data.data.user_details.location))

                        // setfullname(value => (res.data.data.user_details.fullname))
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
        getUserData()
    }, [])




    const renderButton = () => {
        if (loaderr) {
            return (
                <View style={{ alignSelf: 'center' }}>
                    <ActivityIndicator color="black" size="small" />
                </View>
            )
        }
        else {
            return (
                <View style={{ alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => { update() }} style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333", marginTop: 10, alignItems: "center" }}>
                        <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>UPDATE PROFILE</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    {
        return isLoading ? <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator color="black" size="large" />
            </View>
             : (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
            <KeyboardAvoidingView>
                <ScrollView>

                    <ImageBackground source={require('../assets/profilemenu.png')} resizeMode='cover' style={{ alignItems: "center", width: '100%', height: vh * 0.45, }}
                        imageStyle={{ borderRadius: 30, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    >

                        <View style={{ flexDirection: 'row', marginRight: vw * 0.58, padding: vw * 0.06, marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => { props.navigation.navigate("profile") }}>
                                <Image source={require('../assets/back2.png')} style={{ height: 17, width: 26, marginLeft: 7, marginTop: 7 }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 15, marginTop: 3, }}>
                                Edit Profile
                            </Text>

                        </View>
                        <View >
                            <TouchableOpacity onPress={chooseFile}>
                                {

                                    filePath != "" ? <Image source={{ uri: `data:image/jpeg;base64,${filePath}` }} style={{ height: 180, width: 180, borderRadius: 85 }} /> : <Image source={profileimage} style={{ height: 180, width: 180, borderRadius: 85 }} />

                                }
                            </TouchableOpacity>
                        </View>



                    </ImageBackground>

                    <View style={{ alignItems: 'flex-start', padding: 20 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 15 }}>
                            Email
                        </Text>
                        <TextInput
                            placeholder='alicejack@gmail.com'
                            placeholderTextColor="#000" 
                            style={{
                                color:'#000',
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
                            onChangeText={setemail}
                            value={Email}
                        />
                        <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 12 }}>
                            Phone Number
                        </Text>
                        <TextInput
                            placeholder='+1 000 000 0000'
                            style={{
                                color:'#000',
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
                            maxLength={10}
                            minLength={10}
                            keyboardType="numeric"
                            onChangeText={setmobile}
                            value={mobile}
                        />
                        <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 13 }}>
                            Location
                        </Text>
                        <TextInput
                            placeholder='Location of dummy, address'
                            style={{
                                color:'#000',
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
                            onChangeText={setlocation}
                            value={Location}
                        />
                        {renderButton()}


                    </View>

                </ScrollView>
            </KeyboardAvoidingView>


        </SafeAreaView>
    );
                        }
}
