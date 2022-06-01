import { View, Text, ImageBackground, useWindowDimensions, Keyboard, FlatList, Image, KeyboardAvoidingView, TouchableWithoutFeedback, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { vw, vh } from '../constant';
import { TextInput, List } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { axiosClient } from './client';
import RenderHtml from 'react-native-render-html';



// const source = {
//     html: `
//   <p style='text-align:center;'>
//     Hello World!
//   </p>`
//   };
export default function faq(props) {
    const { width } = useWindowDimensions();
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [search, setsearch] = React.useState('');
    const [faqheading, setfaqheading] = useState('');
    const [faqblog, setfaqblog] = useState('');
    const [heading, setheading] = useState('');
    const [title, settitle] = useState('');
    const [faqdatacontrol, setfaqdatacontrol] = useState([]);

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
                    axiosClient.get("home/faq?user_id=" + userDetails.customer_id, axiosConfig).then(res => {
                        console.log("RESPOMSEEEEEE of heading and title", res.data.data.faq_terms);
                        console.log("RESPOMSEEEEEE of faq", res.data.data.faq);

                        setheading(value => (res.data.data.faq_terms.heading))
                        settitle(value => (res.data.data.faq_terms.description))

                        let faqdata = []
                        res.data.data.faq.map((item) => {
                            faqdata.push(item)
                        })
                        setfaqdatacontrol(faqdata)

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
        getUserData();
    }, [])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>


                    {/* <ImageBackground source={require('../assets/loginbb.png')} resizeMode='cover' style={{ alignItems: "center", width: vw * 0.99, height: vh * 1.1, justifyContent: 'center' }}>  */}


                    <View style={{
                        position: 'relative',
                        right: vw * 0.40,
                        marginVertical: 30
                    }} >
                        <TouchableOpacity onPress={() => { props.navigation.navigate("profile") }}>
                            <Image source={require('../assets/back.png')} style={{
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
                            FAQ's
                        </Text>
                    </View>
                    <View style={{}}>

                        <Text style={{ fontWeight: '600', color: '#000', fontSize: 20 }}>
                            {heading}
                        </Text>


                    </View> 
                    <View style={{ marginVertical: 20, alignItems: 'center', marginHorizontal: 21 }}>
                        <Text style={{ color: '#A2A2A2', fontSize: 15, }}>
                            {title}
                        </Text>
                    </View>

                    <View style={{ marginVertical: 10, position: 'relative', right: vw * 0.37, marginTop: vh * 0.04 }}>
                        <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>
                            FAQ
                        </Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 1.5, backgroundColor: '#D6DBDE' }} />



                    </View>


                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ width: vw * 0.90, }}>


                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={faqdatacontrol}
                                keyExtractor={item => item.length}
                                renderItem={({ item }) => (

                                    <List.Accordion

                                        theme={{ colors: { background: '#A2A2A2' } }}
                                        style={{ backgroundColor: 'white', marginBottom: 2 }}

                                        title={item.heading}
                                        titleStyle={{ color: '#000' }}
                                        right={props => <List.Icon {...props} icon={({ size, color }) => (
                                            <Image
                                                source={require('../assets/down.png')}
                                                style={{ height: 20, width: 12 }}
                                            />
                                        )} />}>

                                        <Text style={{ color: '#A2A2A2', marginHorizontal: 10, marginVertical: 10, fontSize: 15 }}>
                                            {item.description}
                                        </Text>
                                        {/* <RenderHtml
                                            contentWidth={width}
                                            source={source}
                                        /> */}
                                    </List.Accordion>



                                )}
                            />

                        </View>
                    </ScrollView>





                    <View style={{ marginVertical: 10 }} >
                        <Text style={{ color: '#BC922E', fontWeight: 'bold', fontSize: 17 }}>STILL STUCK? HELP IS A MAIL AWAY</Text>
                    </View>
                    <View style={{ position: 'relative', top: 0, bottom: 1, right: 0, left: 0 }}>
                        <TouchableHighlight style={{ width: vh * 0.4, borderRadius: 20, backgroundColor: "#333" }}>
                            <Text style={{ color: "white", textAlign: 'center', paddingVertical: 12, fontWeight: "bold" }}>info@lgm.ug</Text>
                        </TouchableHighlight>
                    </View>
                    {/* </ImageBackground>  */}
                </SafeAreaView>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
}
