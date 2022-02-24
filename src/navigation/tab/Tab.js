import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import Arewaiting from '../../screens/Arewaiting';
import SorryNotification from '../../screens/SorryNotification';
import NeedDoctor from '../../screens/NeedDoctor';
import DocTalk from '../../screens/DocTalk';
import BlogScreen from '../../screens/BlogScreen';
import Blogs from '../../screens/Blogs';
import chat from '../../screens/chat';
import notification from '../../screens/notification';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import adminChat from '../../screens/adminChat';

const Tab = createBottomTabNavigator();


export default function myTab(props) {
  const [roleId, setroleId] = useState('0')
  AsyncStorage.getItem("role_id", (err, role_id) => {
    console.log("======>Role__ID", role_id, "<==================");
    if (role_id) {
      setroleId(role_id);
    }
  });




  // let bottomTapNavigator = null
  // AsyncStorage.getItem('is_loggedin', (err, is_loggedin) => {
  //   console.log(is_loggedin,"loginnnnnnnnnnnnnnnnnnnnnnn id")
  //   if (is_loggedin === "1"){
  //   bottomTapNavigator = createBottomTabNavigator({
  //     HomeScreen,
  //     DocTalk,
  //     notification,
  //     chat
  //   });
  //  } else(is_loggedin === "2")
  //   bottomTapNavigator = createBottomTabNavigator({
  //         HomeScreen,
  //          NeedDoctor,
  //         Arewaiting,
  //         SorryNotification
  //      });




  // });

  const Stack = createStackNavigator();

  const DocTalkStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="DocTalk" component={DocTalk} />
        <Stack.Screen name="adminChat" component={adminChat} />

      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator    tabBarOptions={{
      activeTintColor: '#D1A82A',
      inactiveTintColor: '#000',
      showLabel: true,
      style: {backgroundColor: '#fff',},
    }}>
      
      <Tab.Screen name="Home" component={HomeScreen} options={{

        tabBarIcon: () => {

          return (<Image source={require('../../assets/home.png')} style={{ height: 25, width: 25, }} />)
        },

      }}
      />
      <Tab.Screen name="Dr . talk" component={(roleId == '0') ? NeedDoctor : DocTalk} options={{
        tabBarIcon: () => {

          return (<Image source={require('../../assets/doc.png')} style={{ height: 25, width: 25 }} />)
        }
      }} />
      <Tab.Screen name="Notifications" component={(roleId == '0') ? SorryNotification : notification}
        options={{
          tabBarIcon: () => {

            return (<Image source={require('../../assets/notification.png')} style={{ height: 25, width: 20 }} />)
          }
        }} />
      <Tab.Screen name="Chat" component={(roleId == '0') ? Arewaiting : chat} options={{
        tabBarIcon: () => {

          return (<Image source={require('../../assets/chat.png')} style={{ height: 25, width: 25 }} />)
        }
      }} />


    </Tab.Navigator>
  );
}
