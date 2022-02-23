import { createStackNavigator } from '@react-navigation/stack';
// import { Tab } from 'react-native-elements/dist/tab/Tab';
const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}