import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignupDetails from '../../screens/SignupDetails';
import SplashScreen from '../../screens/SplashScreen';
import Login from '../../screens/Login';
import UserSignup from '../../screens/UserSignup';
import SignupScreen from '../../screens/SignupScreen';
import ContWithEmail from '../../screens/ContWithEmail';
import VerifyIdentify from '../../screens/VerifyIdentify';
import HomeScreen from '../../screens/HomeScreen';
import myTab from '../tab/Tab'
import Arewaiting from '../../screens/Arewaiting';
import SignupAsPunter from '../../screens/SignupAsPunter';
import BlogScreen from '../../screens/BlogScreen';
import Blogs from '../../screens/Blogs';
import Form from '../../screens/Form';
import profile from '../../screens/profile';
import editprofile from '../../screens/editprofile';
import faq from '../../screens/faq';
import chat from '../../screens/chat';
import adminChat from '../../screens/adminChat';
import chatting from '../../screens/chatting';
import GusetProfileMessage from '../../screens/GusetProfileMessage';
import DocTalk from '../../screens/DocTalk';
import NeedDoctor from '../../screens/NeedDoctor';
import preseption from '../../screens/preseption';

import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();



export default function MyStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignupDetails" component={SignupDetails} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="preseption" component={preseption} options={{ headerShown: false }} />
            <Stack.Screen name="NeedDoctor" component={NeedDoctor} options={{ headerShown: false }} />
            <Stack.Screen name="GusetProfileMessage" component={GusetProfileMessage} options={{ headerShown: false }} />
            <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }} />
            <Stack.Screen name="adminChat" component={adminChat} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ContWithEmail" component={ContWithEmail} options={{ headerShown: false }} />
            <Stack.Screen name="VerifyIdentify" component={VerifyIdentify} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="myTab" component={myTab} options={{ headerShown: false }} />
            <Stack.Screen name="Arewaiting" component={Arewaiting} options={{ headerShown: false }} />
            <Stack.Screen name="SignupAsPunter" component={SignupAsPunter} options={{ headerShown: false }} />
            <Stack.Screen name="BlogScreen" component={BlogScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Blogs" component={Blogs} options={{ headerShown: false }} />
            <Stack.Screen name="Form" component={Form} options={{ headerShown: false }} />
            <Stack.Screen name="profile" component={profile} options={{ headerShown:false}}/>
            <Stack.Screen name="editprofile" component={editprofile} options={{ headerShown:false}}/>
            <Stack.Screen name="chatting" component={chatting} options={{ headerShown:false}}/>
            <Stack.Screen name="DocTalk" component={DocTalk} options={{ headerShown:false}}/>
            <Stack.Screen name="faq" component={faq} options={{ headerShown:false}}/>
        </Stack.Navigator>
    );
}
