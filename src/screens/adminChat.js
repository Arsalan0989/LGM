import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet,Keyboard, TouchableOpacity, Image } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LogBox } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'react-native-image-picker';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const adminChat = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [singleFile, setSingleFile] = useState('');
  const [initiated_by, setInitiatedBy] = useState('');
  const [postchat, setPostchat] = useState('');
  const [access_token, setaccess_token] = useState('');
  const [sender_id, setsender_id] = useState('');
  const [msg, setmsg] = useState('');
  const [chatId, setChatId] = useState()
  const getMessages = () => {
    let userDetails = {};
    AsyncStorage.getItem('chat_id', (err, chat_id) => {
      if (chat_id) {
        setChatId(chat_id);
      }
    });
    AsyncStorage.getItem('user', (err, userData) => {

      if (userData) {
        userDetails = JSON.parse(userData)
        console.log("sender_id: " + userDetails.customer_id + ' receiver_id: ' + route?.params?.chat_id)
        setaccess_token("Bearer " + userDetails.access_token);
        setsender_id(userDetails.customer_id);

        var config = {
          method: 'get',
          //  url: 'https://hitsofficialuae.com/lgm/api/chat/chatmessages?language=en&user_id=1&receiver_id=119',
          url: 'https://hitsofficialuae.com/lgm/api/drtalk/messages?language=en&chat_id=' + route?.params?.chat_id + '&user_id=' + userDetails.customer_id,
          headers: {
            "Authorization": "Bearer " + userDetails.access_token,
            'Cookie': 'ci_session=3e8489f45df807f9b8944d156dc52dc1a8d03f9b; csrf_cookie_name=3c027a6c3f04bb0f4eb485deed5c54a9'
          }
        };
        console.log(config)
        axios(config)
          .then(function (response) {
            if (response.data.success)
              setMessages(response.data.data)
            if (userDetails.customer_id == response.data.initiated_by || response.data.initiated_by == "")
              setPostchat("0")
            else {
              setPostchat("1")
            }

            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    })

  }
  const selectFile = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 800,
        maxWidth: 800,
        base64: true
      },
      (response) => {
        console.warn(response.assets[0].base64);
        setSingleFile("data:image/png;base64," + response.assets[0].base64);
        setmsg("Attachment")
      },
    )
  };
  const getMessagesEachTime = () => {
    setInterval(getMessages, 5000)
  }
  useEffect(() => {
    // getMessages()
    // console.log(route?.params?.chat_id,'<======= route');
    getMessagesEachTime();
  }, []);



  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const sendImageMessage = (messages) => {
    Keyboard.dismiss()
    const headers = {
      'Authorization': access_token,
      'Content-Type': 'application/json'
    }
    let type = 0
    if (singleFile != '') {
      type = 1
    }
    console.log(singleFile == "")
    const testData = { 'sender_id': sender_id, 'chat_id': route?.params?.chat_id, 'message': msg, 'postchat': 1, 'type': type, 'photo': singleFile }
    axios.post('https://hitsofficialuae.com/lgm/api/drtalk/newChat', testData, {
      headers: {
        'Authorization': access_token,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        setSingleFile("");
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const renderSend = (props) => {
    return (
      <Send {...props}>

        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2D240E"
          />
        </View>


      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2D240E',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }
  const renderAttachment = (props) => {
    return (<View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => navigation.replace("myTab")} style={{ padding: 20, backgroundColor: "#EAE9E6", flexDirection: 'column', justifyContent: 'space-around' }}>
        <Image source={require('../assets/back.png')} style={{ height: 10, width: 16, padding: 2, resizeMode: 'contain' }} />
        <Text style={{ fontSize: 10, }}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={selectFile} style={{ padding: 20, backgroundColor: "#EAE9E6", flexDirection: 'row', justifyContent: 'space-around' }}>
        <Image source={require('../assets/presep.png')} style={{ height: 10, width: 10, padding: 0, resizeMode: 'contain' }} />
      </TouchableOpacity>

    </View>)
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => sendImageMessage(messages)}
      user={{
        _id: sender_id,
      }}
      text={msg}

      inverted={false}
      onInputTextChanged={text => setmsg(text)}
      renderActions={renderAttachment}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      infiniteScroll={true}
      scrollToBottom={true}
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default adminChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
