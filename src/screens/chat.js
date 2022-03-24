import { View, Text, ImageBackground, Platform, FlatList, ActivityIndicator, Keyboard, Image, KeyboardAvoidingView, TouchableWithoutFeedback, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { vw, vh } from '../constant'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { axiosClient } from './client';

export default function chat(props) {
    const [blogData, setBlogData] = useState([])
    const [online, setonline] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const test123 = (receiver_id) => {
        console.log(receiver_id)
        props.navigation.navigate('chatting', { "receiver_id": receiver_id })
        // {"news_id":item.user_id}
    }

    

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
                    console.log(userDetails.customer_id);

                    axiosClient.get("chat/conversations?language=en&user_id=" + userDetails.customer_id, axiosConfig).then(res => {
                        console.log("RESPOMSEEEEEE check ", res.data);
                        setIsLoading(false);

                        let tempArr = []
                        res.data.data.users.map((item) => {
                            tempArr.push(item)

                        })
                        setBlogData(tempArr)

                        let activedata = []
                        res.data.data.onlineusers.map((item) => {
                            activedata.push(item)
                        })
                        setonline(activedata)

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

    {
        return isLoading ? <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color="black" size="large" />
        </View>
            : (
                
                    
                        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
                            {Platform.OS === 'android' ?
                                <View style={{
                                    position: 'absolute',
                                    left: vh * 0.040,
                                    marginVertical: 20,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start'
                                }} >
                                    <TouchableOpacity >
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
                                        Chats
                                    </Text>
                                </View>
                                :
                                <View style={{
                                    position: 'absolute',
                                    left: vh * 0.040,
                                    marginVertical: 50,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start'
                                }} >
                                    <TouchableOpacity >
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
                                        Chats
                                    </Text>
                                </View>
                            }


                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled 
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                data={online}
                                keyExtractor={item => item.user_id}
                                renderItem={({ item }) => (
                                    <View style={{ flex: 1,height: '18%', marginTop: vh * 0.06, marginVertical: 30, alignSelf: 'flex-start' }}>
                                        <View style={{ margin: 2, padding: 5, }}>
                                            <ImageBackground imageStyle={{ borderRadius: 30 }} source={{ "uri": item.profile_pic }} style={{ height: 60, width: 60, }}>
                                                <View style={{ position: 'absolute', right: 1, bottom: 4, }}>
                                                    <Image source={require('../assets/active.png')} style={{ height: 10, width: 10, borderRadius: 22 }} />
                                                </View>
                                            </ImageBackground>
                                            <View style={{ alignItems: 'center', marginVertical: 8 }}>
                                                <Text style={{textAlign:'center',fontSize: 14, fontWeight: '500', color: '#000' }}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>


                                )}
                            />

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={blogData}
                                keyExtractor={item => item.user_id}
                                renderItem={({ item }) => (

                                    <View style={{ marginVertical: 5, marginRight: vw * 0.17, width: vw * 0.75 }}>
                                        <TouchableOpacity onPress={() => { test123(item.user_id) }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <Image source={{ "uri": item.profile_pic }} style={{ height: 60, width: 60, borderRadius: 30 }} />


                                                <View style={{ alignItems: 'flex-start', marginHorizontal: 16, marginVertical: 8, justifyContent: 'flex-start' }}>
                                                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#000', alignItems: 'flex-start' }}>
                                                        {item.name}
                                                    </Text>
                                                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                        <Text style={{ fontSize: 12 ,color:'#A2A2A2'}}>
                                                            {item.message}
                                                        </Text>
                                                        <Text>
                                                            {"  .  "}
                                                        </Text>
                                                        <Text style={{ fontSize: 12,color:'#A2A2A2' }}>
                                                            {item.date}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />

                        </SafeAreaView>

       
            );
    }
}
