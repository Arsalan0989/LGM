import 'react-native-gesture-handler';
import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/stack/AuthStack';
import Tab from './src/navigation/tab/Tab';

export default function App() {
  return (
    <NavigationContainer>{
      
      /* Rest of your app code */
      // <Tab/>
      <AuthStack/>
      
      }</NavigationContainer>
  );
}