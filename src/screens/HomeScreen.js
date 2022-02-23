import React, { useEffect, useState } from 'react'
import { View, StatusBar, SafeAreaView, TouchableHighlight, TextInput, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions, Image, Text } from 'react-native'
import { vw, vh } from '../constant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import SliderBox from 'react-native-image-slider';
import messaging from '@react-native-firebase/messaging';
import Modal from "react-native-modal";
import Carousel, { Pagination } from 'react-native-snap-carousel';

async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
        console.log('Permission status:', authorizationStatus);
    }
}


const UselessTextInput = (props) => {
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={200}
        />
    );
}

export default function HomeScreen(props) {
    const [sliderImages, setSliderImages] = useState([
        "https://source.unsplash.com/1024x768/?banquet",
        "https://source.unsplash.com/1024x768/?married",
        "https://source.unsplash.com/1024x768/?banquet",
        "https://source.unsplash.com/1024x768/?married"
    ])
    const [title, settitle] = useState([
        "lgmcdsdsadfghgfdffdfddadsadsad"
    ]);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [loaderr, setLoader] = useState(false)

    const [blogData, setBlogData] = useState([])
    const [chatId, setChatId] = useState()
    const [querySuccess, setquerySuccess] = useState([])
    const [roleId, setroleId] = useState([])
    const [userId, setUserId] = useState('')
    const [doctortalk, setDoctorTalk] = useState("");
    const [access_token, setAccess_Token] = useState([])
    const [sliders, setSliders] = useState([])
    const [activeSlide, setactiveSlide] = useState(0)
    AsyncStorage.getItem('role_id', (err, roleId) => {
        if (roleId) {
            setroleId(roleId);
        }
    });


    const getStatus = () => {
        AsyncStorage.getItem('user', (err, userDetails) => {
            if (userDetails) {
                let data = JSON.parse(userDetails);

                setUserId(data.customer_id);
                setAccess_Token(data.access_token);

                var config = {
                    method: 'get',
                    url: 'https://hitsofficialuae.com/lgm/api/home/checkquery?user_id=' + data.customer_id,
                    headers: {
                        'Authorization': 'Bearer ' + data.access_token,
                        'Cookie': 'ci_session=3bb13c91d04b4e077bb882b85af5e240cbd39722; csrf_cookie_name=be6b670e882fef0378ace87a5043e304'
                    }
                };
                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                        if (response.data.success) {
                            if (response.data.query_status == 0) {
                                AsyncStorage.setItem("doctorTalk", 'modal')
                                setDoctorTalk("modal");
                            }
                            else {
                                setDoctorTalk("chat");
                                setChatId(response.data.chat_id)
                                AsyncStorage.setItem("doctorTalk", 'chat')
                                AsyncStorage.setItem("chat_id", response.data.chat_id)
                            }
                        } else {
                            setDoctorTalk("DocTalk");
                            AsyncStorage.setItem("doctorTalk", 'DocTalk')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });


    }

    const getUserData = () => {
        let userDetails = {};
        try {
            AsyncStorage.getItem('user', (err, userData) => {
                if (userData) {
                    AsyncStorage.setItem("role_id", userData.role_id)
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
                    axios.get("https://hitsofficialuae.com/lgm/api/home/getHomeData?user_id=" + userDetails.customer_id, axiosConfig).then(res => {
                        console.log("RESPOMSEEEEEE", res.data.data.news);


                        let tempArr = []
                        setSliders(res.data.data.slider)
                        res.data.data.news.map((item) => {
                            tempArr.push(item)

                        })
                        setBlogData(tempArr)
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
    const getGuestData = () => {
        let userDetails = {};
        try {
            let axiosConfig = {

                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    "Cookie": "ci_session=2c33c56a0c53ea95f57b3ed3e827d128efe88050"
                }
            };
            //https://hitsofficialuae.com/lgm/api/guest/getHomeData
            axios.get("https://hitsofficialuae.com/lgm/api/guest/getHomeData", axiosConfig).then(res => {
                console.log("RESPOMSEEEEEE", res.data.data.news);


                let tempArr = []
                setSliders(res.data.data.slider)
                res.data.data.news.map((item) => {
                    tempArr.push(item)
                    // news_id
                    // news_title
                    // news_content_short
                    // news_image

                })
                setBlogData(tempArr)
            }).catch(errr => {
                console.log("ERRRRRRRrrrrrrrrrrrr", errr);
            })

        } catch (error) {
            console.log("Error retrieving data" + error);
        }

    }

    const getUserQueryStatus = () => setInterval(getStatus, 5000);

    useEffect(() => {
        requestUserPermission()
        getUserQueryStatus();
        AsyncStorage.getItem('role_id', (err, roleId) => {
            if (roleId !== "0") {
                getUserData();
                console.log("roleId");
            } else {
                getGuestData();
                console.log("roleIdjkdfkj");
            }

        })
        messaging()
            .getToken()
            .then(token => {
                AsyncStorage.setItem("device_token", token);
            });

        // If using other push notification providers (ie Amazon SNS, etc)
        // you may need to get the APNs token instead for iOS:
        // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

        // Listen to whether the token changes
        messaging().onTokenRefresh(token => {
            AsyncStorage.setItem("device_token", token);
        });
    }, [])

    const checkCondition = () => {
        if (doctortalk == "modal") {
            setModalVisible(true)
        }
        if (doctortalk == "DocTalk")
            props.navigation.navigate("DocTalk")
        if (doctortalk == "chat")
            props.navigation.navigate("adminChat", { 'chat_id': chatId })
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
                    <TouchableHighlight onPress={() => { update() }} style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333" }}>
                        <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }} >WAITING FOR YOUR RESPONSE </Text>
                    </TouchableHighlight >
                </View>
            )
        }
    }
    const windowWidth = Dimensions.get('window').width;
    const _renderItem = ({ item, index }) => {
        return (
            <ImageBackground source={{ uri: item.photo }} resizeMode='cover' style={{ height: vh * 0.38, width: '100%', }}
                imageStyle={{ borderRadius: 40, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignSelf: 'flex-end', paddingRight: vh * 0.04, paddingVertical: vh * 0.095 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 35 }}>{item.title}</Text>
                    <Text style={{ color: '#fff', fontSize: 16 }}> {item.subtitle}</Text>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity style={{ width: vh * 0.17, borderRadius: 20, backgroundColor: "#D1A82A", }}>
                            <Text style={{ color: "white", textAlign: 'center', paddingVertical: 5, fontWeight: '300', }}>{item.button_title}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
    const pagination = () => {
        return (
            <Pagination
                dotsLength={sliders.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: '#123' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: '#123'
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }
    return (

        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
            <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, }}>
                <View style={{ height: vh * 0.38, width: '100%' }} >

                    <View style={{ flex: 1, position: 'absolute', top: vh * 0.03, left: vw * 0.03, elevation: 2, zIndex: 5, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { roleId === "0" ? props.navigation.navigate("GusetProfileMessage") : props.navigation.navigate("profile") }} style={{ backgroundColor: '#fff', width: vw * 0.10, height: vh * 0.05, borderRadius: 20 }}>
                            <Image source={require('../assets/menu.png')} style={{ height: 17, width: 17, padding: 7, marginLeft: vw * 0.024, marginTop: 7 }} />
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17, marginLeft: 10, marginTop: 6, }}>
                            Home
                        </Text>

                    </View>
                    <View>
                        <Carousel
                            autoplay={true}
                            autoplayDelay={1000}
                            autoplayInterval={3000}
                            enableMomentum={false}
                            lockScrollWhileSnapping={true}
                            enableSnap={false}
                            loop={true}
                            data={sliders}
                            renderItem={_renderItem}
                            sliderWidth={windowWidth}
                            itemWidth={windowWidth}
                        />
                        {pagination}
                    </View>

                </View>





                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 25, backgroundColor: "white", elevation: 10, borderRadius: 15, padding: 15 }}>
                    <View style={{ marginHorizontal: vw * 0.04, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { roleId === "0" ? props.navigation.navigate("NeedDoctor") : checkCondition() }} style={{ height: 30, width: 30, alignItems: 'center', borderRadius: 20, backgroundColor: '#D1A82A', position: "absolute", top: vh * -0.05 }}>
                            <Image source={require("../assets/fdoc.png")} style={{ height: 12, width: 12, backgroundColor: '#D1A82A', alignItems: 'center', marginTop: 8, }} />
                        </TouchableOpacity>
                        <Text> Find a Doctor</Text>
                    </View>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "#f1f1f1" }}> | </Text>
                    <View style={{ marginHorizontal: vw * 0.04, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { roleId === "0" ? props.navigation.navigate("GusetProfileMessage") : props.navigation.navigate("preseption") }} style={{ height: 30, width: 30, alignItems: 'center', borderRadius: 20, backgroundColor: '#D1A82A', position: "absolute", top: vh * -0.05 }}>
                            <Image source={require("../assets/pre.png")} style={{ height: 12, width: 12, backgroundColor: '#D1A82A', alignItems: 'center', marginTop: 8 }} />
                        </TouchableOpacity>
                        <Text> Your Prescriptions</Text>
                    </View>
                </View>



                <View style={{ flexDirection: "row", position: 'relative', top: -7 }}>


                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18, marginHorizontal: vw * 0.28 }}>
                        Latest News
                    </Text>

                    <TouchableOpacity onPress={() => (props.navigation.navigate("Blogs"))} style={{ marginHorizontal: vw * 0.28 }}>
                        <Text>See all</Text>
                    </TouchableOpacity>

                </View>
                <View >

                    <FlatList
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        data={blogData}
                        keyExtractor={item => item.news_id}
                        renderItem={({ item }) => (

                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <View style={{ borderRadius: 26, margin: 5, padding: 10, backgroundColor: '#F5F5F5', alignItems: 'center', height: vh * 0.33, width: "100%" }}>
                                    <TouchableOpacity onPress={() => (props.navigation.replace("BlogScreen", { news_id: item.news_id }))}>
                                        <Image source={{ "uri": item.news_image }} style={{ borderRadius: 20, alignItems: 'center', height: vh * 0.2, width: vw * 0.55 }} />
                                    </TouchableOpacity>
                                    {/* {item.news_title} */}
                                    <View style={{ flex: 1, marginBottom: 10, marginRight: 35, padding: 5 }}>
                                        <Text style={{ color: '#2D240E', fontWeight: 'bold', width: vw * 0.4 }} numberOfLines={2}>{item.news_title}</Text>
                                        <Text style={{ margin: 2, color: '#A2A2A2', fontSize: 10, }}>{item.messageTime}</Text>
                                        <Text style={{ color: '#A2A2A2', fontSize: 10 }}> {item.username}</Text>

                                    </View>
                                </View>
                            </View>



                        )}
                    />


                    <Modal isVisible={isModalVisible}>
                        <View style={{ backgroundColor: '#fff', borderWidth: 2, borderColor: '#F9FAFA', borderRadius: 22 }}>
                            <View style={{ marginLeft: vw * 0.04, padding: 5, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2D240E', fontFamily: 'Railway' }}>
                                    Issue Submitted Wait for {"\n"} Doctor's Response
                                </Text>
                                <TouchableOpacity onPress={(toggleModal)} style={{ position: 'absolute', right: 1, marginRight: 10 }}>
                                    <Image source={require('./../assets/close2.png')} style={{ height: 20, width: 15, }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{}}>
                                <UselessTextInput
                                    editable={false}
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
                                        width: vw * 0.83,
                                        fontSize: 15,
                                        backgroundColor: '#fff'
                                    }}
                                />


                            </View>
                            {renderButton()}



                        </View>
                    </Modal>
                </View>


            </ImageBackground>


        </SafeAreaView>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#F5F5F5',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
