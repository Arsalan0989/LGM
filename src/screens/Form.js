import React, { useEffect } from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet, Keyboard, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, ImageBackground, Image, Text } from 'react-native'
import { vw, vh } from '../constant';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const UselessTextInput = (props) => {
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={200}
        />
    );
}
export default function Form() {
    const [userId, setUserId] = React.useState('');
    const [name, setname] = React.useState('');
    const [mobile, setmobile] = React.useState('');
    const [message, setmessage] = React.useState('');
    const support = () => {
        // setLoader(true)
        var postData = {

            userid: userId,
            name: name,
            phone: mobile,
            message: message,

        }
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
                    axios.post("https://hitsofficialuae.com/lgm/api/home/sendinquiry" ,postData, axiosConfig).then(resp => {
                        setUserId(value => (userDetails.customer_id))
                        console.log(userDetails.customer_id,'iddddddddddddddd')
                        console.log(resp, "RESPONSEEEEE");
                        if (resp.status == "200") {
                            setname("")
                            setmobile("")
                            setmessage("")
                            alert(resp.data.data)
                            //    setLoader(false)

                        } else {
                            alert(resp.data.data)
                            // setLoader(false)
                        }

                    })
                        .catch(err => {
                            console.log(err, "Errorrr");
                            alert(err.message)
                            // setLoader(false)
                        })
                } else {
                    console.log(err)
                }
            });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }


    }



    // const getUserData = () => {
    //     let userDetails = null;
    //     try {
    //         AsyncStorage.getItem('user', (err, userData) => {
    //             if (userData) {

    //                 console.log("================================================>")
    //                 console.log(JSON.parse(userData));
    //                 console.log("================================================>")
    //                 userDetails = JSON.parse(userData)
    //                 let axiosConfig = {

    //                     headers: {
    //                         'Content-Type': 'application/json;charset=UTF-8',
    //                         "Access-Control-Allow-Origin": "*",
    //                         "Authorization": "Bearer " + userDetails.access_token,
    //                         "Cookie": "ci_session=2c33c56a0c53ea95f57b3ed3e827d128efe88050"
    //                     }
    //                 };
    //                 axios.post("https://hitsofficialuae.com/lgm/api/home/sendinquiry" + userDetails.customer_id, axiosConfig).then(resp => {
    //                 setUserId(value=>(userDetails.customer_id))    
    //                 console.log(resp, "RESPONSEEEEE");
    //        if (resp.status == "200") {
    //             setname("")
    //             setmobile("")
    //             setmessage("")
    //             alert(resp.data.data)
    //             //    setLoader(false)

    //                    } else {
    //                     alert(resp.data.data)
    //                     // setLoader(false)
    //                 }

    //             })
    //             .catch(err => {
    //                 console.log(err, "Errorrr");
    //                 alert(err.message)
    //                 // setLoader(false)
    //             })
    //             } else {
    //                 console.log(err)
    //             }
    //         });
    //     } catch (error) {
    //         console.log("Error retrieving data" + error);
    //     }







    // }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>

                        <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, }}>
                            {/* checking */}

                            <Image source={require('../assets/data1.png')} reesizeMode='cover' style={{ marginVertical: vh * 0.03, height: 125, width: "90%", }} />




                            <View style={{ alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ fontSize: 16, color: '#BC922E', fontWeight: 'bold' }}>
                                    FILL THIS FORM
                                </Text>
                            </View>

                            <View style={{ marginBottom: vh * 0.0 }}>
                                <View style={{ marginBottom: 10 }}>
                                    <TextInput
                                        mode="outlined"
                                        label="Name"
                                        placeholder="alicejack"
                                        borderColor="false"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{

                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.45,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={setname}
                                        value={name}

                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <TextInput
                                        mode="outlined"
                                        label="Mobile"
                                        placeholder="1+ 000 000 0000"
                                        borderColor="false"
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
                                        onChangeText={setmobile}
                                        value={mobile}
                                    />
                                </View>


                                <View style={{ marginVertical: 10 }}>
                                    <UselessTextInput
                                        multiline
                                        mode="outlined"
                                        label="Message"
                                        p placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{

                                            height: 100,
                                            padding: 10,
                                            width: vh * 0.45,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}

                                        onChangeText={setmessage}
                                        value={message}
                                    />
                                </View>
                                <View style={{ marginVertical: 10, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => { support() }} style={{ borderRadius: 20, backgroundColor: "#333", }}>
                                        <Text style={{ color: "white", paddingHorizontal: vw * 0.35, paddingVertical: 12, fontWeight: "bold" }}>
                                            SEND
                                        </Text>
                                    </TouchableOpacity>
                                </View>
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