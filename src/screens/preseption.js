import React, { useEffect, useState } from 'react'
import { View, StatusBar, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, ImageBackground,  PermissionsAndroid, Image, Platform, Text } from 'react-native'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { vw, vh } from '../constant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';


export default function preseption(props) {
    const [blogData, setBlogData] = useState([])
    const [image, setimage] = useState([]);

    const preseptiondata = [
        {
            id: '1',
            preseptiontime: '8:00 am',
            preseptionText: '  Lorem ipsum Prescription',
            preseption: require('../assets/presep.png'),
        }
    ]

    const predata = () => {
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

                    axios.get("https://hitsofficialuae.com/lgm/api/home/precriptions?user_id=" + userDetails.customer_id, axiosConfig).then(res => {

                        let tempArr = []
                        res.data.data.map((item) => {
                            tempArr.push(item)
                        })
                        setBlogData(tempArr)

                        // let imagedata = []
                        // res.data.data.image.map((item)=>{
                        //     imagedata.push(item)
                        // })
                        // setimage(imagedata)

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

  const checkPermission = async (url) => {

    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage(url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(url);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = (url) => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = url;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };


    useEffect(() => {
        predata();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>

            <ImageBackground source={require('../assets/userSignup.png')} resizeMode='cover' style={{ alignItems: "center", width: "100%", height: vh, }}>
                <View style={{
                    position: 'absolute',
                    left: vh * 0.040,
                    marginVertical: 30,
                    flexDirection: 'row'
                }} >
                    <TouchableOpacity onPress={() => { props.navigation.navigate("myTab") }}>
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
                        Your Prescription
                    </Text>
                </View>

                <View style={{ marginTop: vh * 0.1 }}>
                {blogData.length == 0 ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{marginHorizontal:10,color:'#000',textAlign:'center'}}>YOU HAVE NO PRESCRIPTIONS CURRENTLY. PLEASE USE Dr. Talk AND CHECK AGAIN.</Text></View> : <View></View>}
                    {blogData.map((item, index) => {
                        return (
                            <View style={{ borderTopColor: '#ebebeb', borderTopWidth: 1, borderLeftWidth: 5, borderColor: '#D1A82A', height: vh * 0.12, width: vw * 0.92, borderRadius: 10, backgroundColor: '#fff', elevation: 10, marginVertical: 10 }}>
                                <View style={{ flexDirection: 'row', marginHorizontal: 5, marginVertical: 5 }}>
                                    <Text>
                                   {item.time}
                                    </Text>
                                    <TouchableOpacity style={{ position: 'absolute', right: 0 }} >
                                        <Image source={require('../assets/close2.png')} style={{ height: 15, width: 15 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginHorizontal: 13 }}>
                                    <Text>{item.title}

                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 5,justifyContent:'flex-start',marginHorizontal:10 }}>
                                    {item.image.map((img, index) => {
                                        console.log(img)
                                        return (<TouchableOpacity onPress={()=>checkPermission(img)} style={{ height: 22, width: 80, backgroundColor: "#EAE9E6", borderRadius: 2, marginRight:5,flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <Image source={require('../assets/presep.png')} style={{ height: 10, width: 10, marginTop: 5 }} />
                                            <Text >image.png</Text>
                                        </TouchableOpacity>)
                                    })

                                    }


                                </View>

                            </View>
                        )

                    })}
                   
                </View>



            </ImageBackground>


        </SafeAreaView>
    )
}
