import React, { useEffect, useState } from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet, Keyboard, TouchableHighlight, TextInput,ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, ImageBackground, Image, Text } from 'react-native'
import { vw, vh } from '../constant'
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox, Icon } from 'react-native-elements';
import Modal from "react-native-modal";
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
export default function DocTalk(props) {
  const [userId, setUserId] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setmessage] = useState('');
    const [select, setselect] = useState(false);
    const [isSelected, setisSelected] = useState(false);
    const [value, setValue] = useState("");
    const [items, setItems] = useState([
        { label: 'I am addicted to gaming', value: 'I am addicted to gaming' },
        { label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
        { label: 'Duis aute irure dolor in reprehenderit', value: 'Duis aute irure dolor in reprehenderit' },
        { label: 'Duis in reprehenderit', value: 'Duis in reprehenderit' },
        { label: 'esse cillum dolore eu fugiat nulla pariatur', value: 'esse cillum dolore eu fugiat nulla pariatur' },
        { label: 'excepteur sint occaecat cupidatat non proident,', value: 'excepteur sint occaecat cupidatat non proident' },
    ]);
    const [loaderr, setLoader] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [available_type, setAvailable_Type] = useState("");
    const [chatId,setChatId] = useState()

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const checkCondition = () => {
      AsyncStorage.getItem('doctorTalk', (err, check) => {
        if(check){
          if(check == "modal"){
          setModalVisible(true)
        }
        if(check == "DocTalk"){
          // props.navigation.navigate("DocTalk")

        }
        if(check == "chat"){
          AsyncStorage.getItem("chat_id", (err, chat_id) => {
            console.log("**************"+chat_id+"**********")
            if(chat_id){
              props.navigation.replace("adminChat",{'chat_id':chat_id})
            }
          });
        }
        }
    }
    )}

      useEffect(() => {
        checkCondition();
      },[]);
    const update = () => {
        if (message != "" && value != "" && (isSelected || select ) ) {
                  setLoader(true)
                  let userDetails = null;
          try {
              AsyncStorage.getItem('user', (err, userData) => {
                  if (userData) {

                      userDetails = JSON.parse(userData)
                      console.log("**************",userDetails.customer_id,"**************")
                      setUserId(userDetails.customer_id)
                      let axiosConfig = {

                          headers: {
                              'Content-Type': 'application/json;charset=UTF-8',
                              "Access-Control-Allow-Origin": "*",
                              "Authorization": "Bearer " + userDetails.access_token,
                              "Cookie": "ci_session=2c33c56a0c53ea95f57b3ed3e827d128efe88050"
                          }
                      };
                      let avail = ""
                      if(isSelected){
                        avail = "Paid Check-Up Accepted"
                      }
                      if(select){
                        avail = "Available for Check-Up"
                      }
                      if(isSelected && select){
                        avail = "Paid Check-Up Accepted,Available for Check-Up"
                      }

                      var postData = {
                          userid: userDetails.customer_id,
                          problem_type: value,
                          available_type: avail,
                          message: message,

                      }
                  axios.post("https://hitsofficialuae.com/lgm/api/home/dcotalk", postData,axiosConfig).then(res => {
                      console.log(userDetails.customer_id,'iddddddddddddddd')
                  console.log(res, "RESPONSEEEEE");
                      setLoader(false)
                      if (res.status == "200") {
                          setModalVisible(true)
                          setTimeout(()=>{  setModalVisible(false)
                            props.navigation.replace('adminChat',{'chat_id':res.data.chat_id})},2000)
                            // setisSelected("")
                            // setselect("")
                            // setmessage("")
                      } else {
                          setModalVisible(false)
                          setLoader(false)
                          alert(res.data.errorMessage)

                      }


                  }).catch(err => {
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
        else{
          setModalVisible(false)
            alert("filled all the entry ")
            return
        }


    }

    const renderButton = () => {
        if (loaderr) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', marginVertical:10 }}>
                    <ActivityIndicator color="black" size="small" />
                </View>
            )
        }
        else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <TouchableHighlight  onPress={() => { update() }} style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333" }}>
                    <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }} >SEND </Text>
                </TouchableHighlight >
            </View>
            )
        }
    }
    return (

        <SafeAreaView style={{ alignItems: "center", backgroundColor: '#fff' }}>

            <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh }}>

                <View style={{ flexDirection: 'row', marginRight: vw * 0.55, padding: 20 }}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('myTab')}} > 
                        <Image source={require('../assets/menu.png')} style={{ height: 17, width: 17, marginRight: 30, padding: 7, }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 17 }}>
                        Dr . Talk
                    </Text>
                </View>
                <View style={{ marginRight: vh * 0.10, }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'black' }}>Pick Your Problem</Text>
                </View>

                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <DropDownPicker
                        style={{ width: vw * 0.9, borderRadius: 22, color: 'black', borderWidth: 2, borderColor: '#B7B7B7', backgroundColor: '#F5F5F5' }}
                        placeholder='Pick Your Problem'
                        placeholderStyle={{
                            color: "black",
                            fontWeight: "bold"
                        }}
                        // theme="DARK"
                        open={open}
                        value={value}
                        items={items}
                        dropDownContainerStyle={{
                            backgroundColor: "#F5F5F5",
                            width: vw * 0.9,
                            borderColor: '#B7B7B7',
                            borderRadius: 22,
                        }}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    // multiple={true}
                    // min={1}
                    // max={2}
                    />
                </View>
                <View style={{}}>
                    <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: 20, fontSize: 16 }}> Message</Text>
                    <UselessTextInput

                        multiline
                        numberOfLines={4}
                        placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                        style={{
                            height: vh * 0.15,
                            borderRadius: 22,
                            margin: 12,
                            borderColor: '#A2A2A2',
                            borderWidth: 2,
                            padding: 10,
                            width: vw * 0.90,
                            fontSize: 15,
                            backgroundColor: '#fff',
                            textAlignVertical:'top'
                        }}
                        onChangeText={setmessage}
                        value={message}
                    />
                </View>
                <View style={{ marginRight: vw * 0.32, padding: 20, marginTop: -20 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <CheckBox style={{}}
                            theme={{ colors: { primary: '#BC922E', underlineColor: 'transparent', } }}
                            center
                            // title="Available for Check-Up"
                            checked={select}
                            onPress={() => {
                              setselect(!select)
                              //setAvailable_Type("Available for Check-Up,Paid Check-Up Accepted")
                                setAvailable_Type("Available for Check-Up")
                            }}
                        />
                        <Text style={{ marginVertical: 15, color: 'black' }}>
                            Available for Check-Up
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            theme={{ colors: { primary: '#BC922E', underlineColor: 'transparent', } }}
                            center
                            // title="Paid Check-Up Accepted"
                            checked={isSelected}
                            onPress={() => {
                              setisSelected(!isSelected)
                                setAvailable_Type("Paid Check-Up Accepted")
                            }}
                        />
                        <Text style={{ marginVertical: 15, color: 'black' }}>
                            Paid Check-Up Accepted
                        </Text>
                    </View>

                </View>
                <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                {renderButton()}
                        <Modal isVisible={isModalVisible}>
                            <View style={{ backgroundColor: '#fff', borderWidth: 2, borderColor: '#F9FAFA', borderRadius: 22 }}>
                                <View style={{ marginLeft: vw * 0.04, padding: 5, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2D240E', fontFamily: 'Railway' }}>
                                      Issue Submitted. Kindly wait for doctor’s response.{"\n"} We will notify you too.
                                    </Text>
                                    <TouchableOpacity onPress={(toggleModal)} style={{ position: 'absolute', right: 1, marginRight: 10 }}>
                                        <Image source={require('./../assets/close2.png')} style={{ height: 20, width: 15, }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{}}>
                                    <Text
                                        numberOfLines={4}
                                        style={{
                                            height: vh * 0.15,
                                            borderRadius: 22,
                                            margin: 12,
                                            borderColor: '#A2A2A2',
                                            borderWidth: 2,
                                            padding: 10,
                                            width: vw * 0.83,
                                            fontSize: 15,
                                            backgroundColor: '#fff'
                                        }}
                                    >{message}</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                                    <TouchableHighlight  onPress={() => { console.log("tap") }} style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333" }}>
                                        <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }} >WAITING FOR RESPONSE</Text>
                                    </TouchableHighlight >
                                  </View>

                                </View>



                                {/* <Button title="Hide modal" onPress={toggleModal} style={{borderRadius:52,color:'black'}}/> */}
                            </View>
                        </Modal>


                </View>

            </ImageBackground>


        </SafeAreaView>
    );
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
