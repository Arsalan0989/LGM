import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Image, Switch, TouchableOpacity, SafeAreaView } from 'react-native'
import { vw, vh } from '../constant'
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from  '@react-native-community/async-storage';

export default function SignupAsPunter(props) {
    const [BName, setBName] = React.useState('');
    const [regno, setregno] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [cpassword, setcpassword] = React.useState('');
    const [email, setemail] = React.useState('');
    const [mobileno, setmobileno] = React.useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [location, setlocation] = React.useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [loaderr, setLoader] = useState(false)

    const signupUser = () => {

        if (mobileno.length < 10) {
            alert('invalid numbers');
        }
        if (BName == "" || regno == "" || password == "" || cpassword == "" || email == "" || mobileno == "" || isEnabled == "" || location == "") {
            alert("filled all the entry ")
        }
        else if (mobileno.length < 10) {
            alert('invalid numbers');
        }

        else {


            if (password == cpassword) {
              AsyncStorage.getItem('device_token', (err, device_token) => {
                  if (device_token) {
                    setLoader(true)
                    var postData = {
                        businessname: BName,
                        registrationnumber: regno,
                        location: location,
                        email: email,
                        password: password,
                        phonenumber: mobileno,
                        deviceToken: device_token
                    }
                    axios.post("https://hitsofficialuae.com/lgm/api/user/punter", postData).then(res => {
                        console.log(res.data, "RESPONSEEEEE");
                        if (res.data.success) {
                            try {
                                AsyncStorage.setItem("is_loggedin","2")
                                AsyncStorage.setItem("user",JSON.stringify(res.data))
                                setBName("")
                                setregno("")
                                setpassword("")
                                setcpassword("")
                                setemail("")
                                setmobileno("")
                                setlocation("")
                                setIsEnabled(false)
                                props.navigation.navigate("VerifyIdentify", { "emailAddress": email })
                                setLoader(false)
                            } catch (e) {
                                console.log(e);
                            }

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
                <View style={{  }}>
                    <ActivityIndicator color="black" size="small" />
                </View>
            )
        }
        else {
            return (
                <View>
                    <TouchableOpacity onPress={() => { signupUser() }} style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333" }}>
                        <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>Signup</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView >
                    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>

                        <ImageBackground source={require('../assets/loginbb.png')} resizeMode='cover' style={{ alignItems: "center", width: vw * 0.99, height: vh * 1.13 }}>
                            <View style={{ position: 'relative', right: vw * 0.35, marginVertical: 20 }}>
                                <TouchableOpacity onPress={() => { props.navigation.navigate("SignupDetails") }} >
                                    <Image source={require('../assets/back.png')} style={{ height: 10, width: 30, marginRight: 20, padding: 10, }} />
                                </TouchableOpacity>
                            </View>



                            <View>

                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ fontWeight: "bold", color: '#BC922E' }}>HELLO PUNTER,</Text>
                                    <Text style={{ fontWeight: "bold", color: '#000', fontSize: 24 }}>Sign Up!</Text>
                                </View>
                                <View style={{}}>
                                    <TextInput
                                        mode="outlined"
                                        label="Business Name"
                                        placeholder="e.g. Tesla"
                                        borderColor="false"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{

                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.4,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}


                                        onChangeText={txt => { setBName(txt) }}
                                        value={BName}
                                    />
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput

                                        placeholder='e.g. 0000 0000'
                                        mode="outlined"
                                        label="Registration Number"
                                        borderColor="false"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{
                                          textAlignVertical:'center',
                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.4,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={setregno}
                                        value={regno}
                                    />
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput

                                        placeholder='+1000 000 0000'
                                        mode="outlined"
                                        label="Mobile Number"
                                        borderColor="false"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{

                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.4,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={setmobileno}
                                        value={mobileno}
                                    />
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput

                                        placeholder='alicejack@gmail.com'
                                        mode="outlined"
                                        label="Email Address"
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
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput

                                        placeholder='e.g. Evans Mills NY 13637'
                                        mode="outlined"
                                        label="Location"
                                        borderColor="false"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{

                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.4,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={setlocation}
                                        value={location}
                                    />
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput
                                        placeholder='*******'
                                        mode="outlined"
                                        label="Password"
                                        borderColor="false"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{

                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.4,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={setpassword}
                                        value={password}

                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput
                                        placeholder='********'
                                        mode="outlined"
                                        label="Confrim Password"
                                        borderColor="false"
                                        theme={{ roundness: 30, colors: { primary: '#A2A2A2', underlineColor: 'transparent', } }}
                                        style={{

                                            height: 30,
                                            padding: 10,
                                            width: vh * 0.4,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeText={setcpassword}
                                        value={cpassword}

                                        secureTextEntry={true}
                                    />
                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                                <Switch
                                    // style={{marginRight:30}}
                                    trackColor={{ false: "#A2A2A2", true: "#A2A2A2" }}
                                    thumbColor={isEnabled ? "#BC922E" : "#2D240E"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}

                                />
                                <View style={{ marginRight: vh * 0.10 }}>
                                    <Text >I accept the policy and terms</Text>
                                </View>

                            </View>
                            {renderButton()}


                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: '#000' }}>Already have account?</Text>
                                <TouchableOpacity onPress={() => { props.navigation.navigate("Login") }} >
                                    <Text style={{ color: '#BC922E' }}> Login </Text>
                                </TouchableOpacity>
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
