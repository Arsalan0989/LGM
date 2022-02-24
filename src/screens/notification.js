import { View, Text, FlatList, ActivityIndicator, Keyboard, Image, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { vw, vh } from '../constant';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
export default function notification(props) {
    const [todaydata, settodaydata] = useState([]);
    const [previousnotifications, setperiousnotification] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    var swipeoutBtns = [
        {
            text: 'Delete',
            backgroundColor: 'black',
            onPress: () => { Delete() }
        }

    ]

    const test = () => {
        let userDetails = {};
        try {
            AsyncStorage.getItem('user', (err, userData) => {
                if (userData) {
                    console.log(JSON.parse(userData));
                    userDetails = JSON.parse(userData)
                    let axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                            "Access-Control-Allow-Origin": "*",
                            "Authorization": "Bearer " + userDetails.access_token,
                            "Cookie": "ci_session=2c33c56a0c53ea95f57b3ed3e827d128efe88050"
                        }
                    };

                    axios.get("https://hitsofficialuae.com/lgm/api/home/notifications?user_id=" + userDetails.customer_id, axiosConfig).then(res => {
                        console.log("RESPOMSEEEEEE check ", res.data.data);
                        console.log('====================================');
                        console.log(userDetails.customer_id);
                        console.log('====================================');
                        // setIsLoading(false);
                        setIsLoading(false);

                        let today = []
                        res.data.data.todaynotifications.map((item) => {
                            today.push(item)

                        })
                        settodaydata(today)

                        let previous = []
                        res.data.data.previousnotifications.map((item) => {
                            previous.push(item)
                        })
                        setperiousnotification(previous)

                    }).catch(errr => {
                        console.log("ERRRRRRRrrrrrrrrrrrr", errr);
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
        test();
    }, [])


    const Delete = (del_id) => {
        let userDetails = {};
        try {
            AsyncStorage.getItem('user', (err, userData) => {
                if (userData) {
                    console.log(JSON.parse(userData));
                    userDetails = JSON.parse(userData)
                    let axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                            "Access-Control-Allow-Origin": "*",
                            "Authorization": "Bearer " + userDetails.access_token,
                            "Cookie": "ci_session=2c33c56a0c53ea95f57b3ed3e827d128efe88050"
                        }
                    };

                    axios.get("https://hitsofficialuae.com/lgm/api/home/deletenotification?notifiction_id=" + del_id, axiosConfig).then(res => {
                        console.log("RESPOMSEEEEEE check ", res.data);


                        test();


                    }).catch(errr => {
                        console.log("ERRRRRRRrrrrrrrrrrrr", errr);
                    })
                } else {
                    console.log(err)
                }
            });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }







    }

    // useEffect(() => {
    //     Delete();
    // }, [])

    {
        return isLoading ? <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color="black" size="large" />
        </View>
            : (
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff', }}>

                            <View style={{
                                position: 'absolute',
                                left: vh * 0.040,
                                // marginVertical: 30,
                                flexDirection: 'row',
                                marginTop: 60,
                            }} >
                                <TouchableOpacity style={{}}>
                                    <Image source={require('../assets/menu.png')} style={{
                                        height: 12,
                                        width: 22,
                                    }} />
                                </TouchableOpacity>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 16,
                                    fontWeight: '700',
                                    marginLeft: vw * 0.09,
                                    position: 'absolute',
                                    bottom: -5
                                }}>
                                    Notification
                                </Text>
                            </View>
                            <View style={{ marginTop: vh * 0.085, marginVertical: vh * 0.020 }}>
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, position: 'relative', right: vw * 0.37 }}>
                                    Today
                                </Text>
                            </View>


                            {
                                (todaydata.length > 0) ? <FlatList
                                    showsHorizontalScrollIndicator={false}

                                    showsVerticalScrollIndicator={false}
                                    data={todaydata}
                                    keyExtractor={item => item.notifiction_id}
                                    renderItem={({ item }) => (



                                        <Swipeout right={[{
                                            text: 'Delete',
                                            backgroundColor: 'black',
                                            onPress: () => { Delete(item?.notifiction_id) }
                                        }]} autoClose={true} backgroundColor="transparent" width="100%">
                                            <View style={{ flexDirection: "row", width: vw * 0.9, marginVertical: 5 }}>
                                                <Image source={{ "uri": item.image }} style={{ height: vh * 0.082, width: vw * 0.17, borderRadius: 30 }} />
                                                <View style={{ flex: 3, alignItems: 'flex-start', marginVertical: 8, marginHorizontal: 10 }}>
                                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#000', }}>
                                                        {item.name}
                                                    </Text>
                                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: 'space-around' }}>
                                                        <Text style={{ fontSize: 12, width: "70%", marginLeft: 8 }}>
                                                            {item.message}
                                                        </Text>
                                                        <Text style={{ fontSize: 12, marginLeft: 20, justifyContent: 'space-around', }}>
                                                            {item.created_on}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Swipeout>


                                    )}
                                /> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>No Notification found</Text></View>
                            }
                            <View style={{ position: 'relative', right: vw * 0.34 }} >
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>
                                    Yesterday
                                </Text>
                            </View>
                            {
                                previousnotifications.length > 0 ?
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}

                                        showsVerticalScrollIndicator={false}
                                        data={previousnotifications}
                                        keyExtractor={item => item.notifiction_id}
                                        renderItem={({ item }) => (



                                            <Swipeout right={[{
                                                text: 'Delete',
                                                backgroundColor: 'black',
                                                onPress: () => { Delete(item?.notifiction_id) }
                                            }]} autoClose={true} backgroundColor="transparent" width="100%">
                                                <View style={{ flexDirection: "row", width: vw * 0.9, marginVertical: 5 }}>
                                                    <Image source={{ "uri": item.image }} style={{ height: vh * 0.082, width: vw * 0.17, borderRadius: 30 }} />
                                                    <View style={{ flex: 3, alignItems: 'flex-start', marginVertical: 8, marginHorizontal: 10 }}>
                                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#000', }}>
                                                            {item.name}
                                                        </Text>
                                                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: 'space-around' }}>
                                                            <Text style={{ fontSize: 12, width: "70%", marginLeft: 7 }}>
                                                                {item.message}
                                                            </Text>
                                                            <Text style={{ fontSize: 12, marginLeft: 20, justifyContent: 'space-around', }}>
                                                                {item.created_on}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Swipeout>


                                        )}
                                    /> :
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>No Notification found</Text></View>
                            }



                        </SafeAreaView>
                    </TouchableWithoutFeedback>

                </KeyboardAvoidingView>
            );
    }
}
