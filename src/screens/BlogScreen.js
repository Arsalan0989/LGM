import React, { useEffect, useState } from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet,ActivityIndicator,TouchableOpacity, ImageBackground, Image, Text } from 'react-native'
import { vw, vh } from '../constant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
export default function BlogScreen(props) {
    const [isLoading, setIsLoading] = useState(true)

    const [newsImage, setnewsImage] = useState("")
    const [newsTitle, setnewsTitle] = useState("")
    const [newsTime, setnewsTime] = useState("")
    const [newsUsername, setnewsUsername] = useState("")
    const [newsBlog, setnewsBlog] = useState("")
    const [profileimg, setprofileimg] = useState("")
    const [roleId, setroleId] = useState([])
    const [currNewsId, setCurrNewsId] = useState('');
    const [next, setnext] = useState(0);
    const [prev, setprev] = useState(0);
    AsyncStorage.getItem('role_id', (err, roleId) => {
        if (roleId) {
            setroleId(roleId);
        }
    });
    const getUserData = (CurrStateStatus = currNewsId) => {
        if (CurrStateStatus == "next") {
            let nextId = props.route.params.news_id + 1;
            setCurrNewsId(nextId);
        } else if (CurrStateStatus == "prev") {
            let prevId = props.route.params.news_id - 1;
            setCurrNewsId(prevId);
        } else {
            setCurrNewsId(props.route.params.news_id);
        }

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

                    axios.get("https://hitsofficialuae.com/lgm/api/home/singleblog?user_id=" + userDetails.customer_id + "&news_id=" + props.route.params.news_id, axiosConfig).then(res => {
                        console.log("RESPOMSEEEEEE check ", res.data.next_id);
                        setIsLoading(false);
                        setnext(res.data.next_id)
                        setprev(res.data.previous_id)
                        setnewsImage(res.data.data.news_image)
                        setnewsBlog(res.data.data.news_content_short)
                        setnewsTime(res.data.data.time)
                        setnewsTitle(res.data.data.news_title)
                        setnewsUsername(res.data.data.username)
                        setprofileimg(res.data.data.profile_pic)




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
        console.log("roleIdjkdfkj");

        AsyncStorage.getItem('role_id', (err, roleId) => {
            if (roleId !== "0") {
                getUserData();
                console.log("roleId");
            } else {
                getGuestData();
                console.log("roleIdjkdfkj");
            }

        })
    }, [])


    {
        return isLoading ? <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator color="black" size="large" />
            </View>
             : (

        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff', position: 'relative' }}>

            <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, }}>

                <View style={{ flexDirection: 'row', marginRight: vw * 0.6, padding: 15 }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("myTab") }}>
                        <Image source={require('../assets/back.png')} style={{ height: 17, width: 25, marginRight: 20, padding: 7, }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
                        Blog
                    </Text>

                </View>


                <View style={{ borderRadius: 26, marginVertical: 20, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', height: vh * 0.35, width: vw * 0.90, }}>
                    <Image source={{ "uri": newsImage }} style={{ borderRadius: 20, alignItems: 'center', height: vh * 0.20, width: vw * 0.80, marginVertical: 10 }} />

                    <Text style={{ color: '#000', textAlign: 'left', marginHorizontal: 10 }}>{newsTitle}</Text>

                    <View style={{ flexDirection: "row", marginVertical: 10, marginHorizontal: 10, width: "85%" }}>
                        <Image source={{ "uri": profileimg }} style={{ height: 30, width: 30, borderRadius: 22 }} />
                        <Text style={{ marginLeft: 10, width: "70%" }}>{newsUsername}</Text>
                        <Text style={{ fontSize: 10, marginTop: vh * 0.004, marginHorizontal: 10 }}></Text>
                    </View>


                </View>


                <ScrollView style={{ flex: 1, marginBottom: vh * 0.12 }}>
                    <Text numberOfLines={5000} style={{ padding: 20, color: '#A2A2A2' }}>
                        {newsBlog}
                    </Text>
                </ScrollView>




            </ImageBackground>

            <View style={{
                alignSelf: 'center',
                flexDirection: 'row', position: "absolute", bottom: 0,
            }}>
                <TouchableOpacity onPress={() => { if (prev != 0) props.navigation.replace("BlogScreen", { "news_id": prev }) }} style={{ marginRight: vw * 0.09, marginVertical: 10 }}>
                    <Image source={require('../assets/left.png')} style={{ height: vh * 0.03, width: vw * 0.092, resizeMode: 'contain' }} />
                </TouchableOpacity>

                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { roleId === "0" ? props.navigation.navigate("GusetProfileMessage") : props.navigation.navigate("Form") }} style={{ width: vh * 0.24, height: 45, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: "#333" }}>
                        <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>
                            HELP
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { if (next != 0) props.navigation.replace("BlogScreen", { "news_id": next }) }} style={{ marginLeft: vw * 0.09, marginVertical: 10 }}>
                    <Image source={require('../assets/right.png')} style={{ height: vh * 0.03, width: vw * 0.094,resizeMode: 'contain' }} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>



    );
        }
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
