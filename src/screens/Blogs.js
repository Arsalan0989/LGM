import React, { useEffect,useState } from 'react'
import { View, ScrollView, SafeAreaView, ActivityIndicator,FlatList, TouchableOpacity, ImageBackground, Image, Text } from 'react-native'
import { vw, vh } from '../constant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
export default function HomeScreen(props) {

    const [blogData,setBlogData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

   
    const getUserData = () => {
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

                    axios.get("https://hitsofficialuae.com/lgm/api/home/blogs?user_id=" + userDetails.customer_id, axiosConfig).then(res => {
                        console.log("RESPOMSEEEEEE", res.data.data.news);
                        console.log("RESPOMSEEEEEE", res.data.data.featured);
                        setIsLoading(false)
                        let tempArr = []
                        res.data.data.news.map((item)=>{
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

                    axios.get("https://hitsofficialuae.com/lgm/api/guest/blogs", axiosConfig).then(res => {
                        console.log("RESPOMSEEEEEE", res.data.data.news);
                        console.log("RESPOMSEEEEEE", res.data.data.featured);
                        let tempArr = []
                        res.data.data.news.map((item)=>{
                            tempArr.push(item)
                        })
                        setBlogData(tempArr)
                    }).catch(errr => {
                        console.log("ERRRRRRRrrrrrrrrrrrr", errr);
                    })

        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    useEffect(() => {
      AsyncStorage.getItem('role_id', (err, roleId) => {
        if(roleId!=="0"){
          getUserData();
          console.log("roleId");
        }else{
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
        //     <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : "height"}
        //     style={styles.container}
        //   >

        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>

            <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, }}>

                <View style={{ flexDirection: 'row', marginRight: vw * 0.6, padding: 10 }}>
                    <TouchableOpacity >
                        <Image source={require('../assets/menu.png')} style={{ height: 17, width: 17, marginRight: 30, padding: 7, }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
                        Blog
                    </Text>

                </View>

                <View style={{ marginRight: vw * 0.4, marginVertical: 10 }}>
                    <Text style={{ color: '#BC922E', fontWeight: 'bold', fontSize: 14 }}>BASED ON YOUR INTEREST</Text>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 30 }}>Featured Blog</Text>
                </View>

                {blogData.map((item,index)=>{
                if(index == 0){
                    return(
                        <TouchableOpacity onPress={() => { props.navigation.navigate("BlogScreen",{"news_id":item.news_id}) }}>
                       
                        <View style={{ borderRadius: 26, marginVertical: 20, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', height: vh * 0.35, width: vw * 0.90, }}>
                    <Image source={{"uri":item.news_image}} style={{ borderRadius: 20, alignItems: 'center', height: vh * 0.20, width: vw * 0.80, marginVertical: 10 }} />

                    <Text style={{ color: '#000',textAlign:'left',marginHorizontal:10 }}>{item.news_title.substring(0,100)}</Text>

                    <View style={{ flexDirection: "row", marginVertical: 10,marginHorizontal:10 ,width:"85%"}}>
                        <Image source={{ "uri": item.profile_pic }} style={{ height: 30, width: 30, borderRadius: 22 }} />
                        <Text style={{ marginLeft: 10,width :"70%" }}>{item.username}</Text>
                        <Text style={{ fontSize: 10, marginTop: vh * 0.004, marginHorizontal: 10 }}>{item.time}</Text>
                    </View>


                </View>
                    </TouchableOpacity>
                        )


                    }

                })}



                <View style={{ marginRight: vw * 0.50, marginVertical: vh * 0.01 }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
                        Your Daily Read
                    </Text>
                </View>
                <FlatList
                        showsVerticalScrollIndicator={false}
                        data={blogData}
                        keyExtractor={item => item.news_id}
                        renderItem={({ item }) => (

                            <TouchableOpacity onPress={() => { props.navigation.navigate("BlogScreen",{"news_id":item.news_id}) }}>
                            <View style={{ flexDirection: 'row',marginHorizontal:10, borderRadius: 26, margin: 5, padding: 10, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: "space-evenly", height: vh * 0.17, width: "90%" }}>
                                <Image source={{"uri":item.news_image}} style={{ borderRadius: 20, alignItems: 'center', height: 100, width: 100,marginHorizontal:10 }} />
                                <View style={{marginHorizontal:20}}>
                                    <Text style={{ color: '#2D240E', marginBottom: vh * 0.03, width:vw*0.5,}}>{item.news_title}</Text>
                                    <View style={{ flexDirection: "row",width:"80%" }}>
                                        <Text style={{ color: '#000', }}>{item.username}</Text>
                                        <Text style={{ fontSize: 10 }}>{item.time}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>



                        )}
                    />



            </ImageBackground>


        </SafeAreaView>


        //    </KeyboardAvoidingView>
    )
                        }
}
