import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { vw, vh } from '../constant';
import AsyncStorage from '@react-native-community/async-storage';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios';
import { axiosClient } from './client';
const styles = StyleSheet.create({

    // root: {flex: 1, padding: 20},
    // title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: { marginTop: 50 },
    cell: {
        color: '#000',
        width: 45,
        height: 45,
        lineHeight: 44,
        fontSize: 24,
        borderRadius: 6,
        backgroundColor: '#F6F6F6',

        borderWidth: 1,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
});

const CELL_COUNT = 4;



export default function VerifyIdentify(props) {
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    // const [mydata,setdata]=useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [loaderr, setLoader] = useState(false);
    const [prop1s, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        let mydata = props.route.params
        setEmail(mydata.emailAddress)
        // console.log(mydata);
        console.log(mydata, "email")
    }, [])
    // console.log(email)

    const loginuser = () => {
        setLoader(true)
        var postData = {


            userEmail: email,
            verificationCode: value,
        }
        axiosClient.post("user/verifyEmail", postData).then(res => {
            console.log(res.data, "RESPONSEEEEE");

            if (res.data.verificationStatus) {
                AsyncStorage.setItem("is_loggedin", '1')
                AsyncStorage.setItem("role_id", res.data.role_id)
                AsyncStorage.setItem("user", JSON.stringify(res.data))
                props.navigation.replace("myTab")
                setLoader(false)

            } else {
                alert(res.data.error)
                setLoader(false)
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
                <View style={{ flex: 1, alignItems: 'center', padding: '8%' }}>
                    <ActivityIndicator color="black" size="small" />
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', padding: '8%' }}><TouchableOpacity onPress={() => { loginuser() }} style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333" }}>
                    <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>VERIFY AND CREATE ACCOUNT</Text>
                </TouchableOpacity></View>
            )
        }
    }
    return (

        <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: '#fff', }}>
            <View style={{ flexDirection: 'row', padding: 8 }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("SignupScreen") }} >
                    <Image source={require('../assets/back.png')} style={{ height: 10, width: 30, marginRight: 20, padding: 10, }} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 17 }}>
                    Verify Identity
                </Text>

            </View>
            <View style={{ marginLeft: vw * 0.15, }}>
                <Text style={{ color: '#000' }} >Please check your email and enter the Code.</Text>
            </View>


            <View style={{
                marginLeft: 70,
                marginRight: 70, justifyContent: 'flex-start',
            }}>
                <CodeField

                    ref={ref}
                    {...prop1s}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text

                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
            </View>


            {renderButton()}
        </SafeAreaView>
    )
}
