import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import AddChat from './Screens/AddChat';
import Chat from './Screens/Chat';

const Stack = createStackNavigator();
const globalOption = {
	headerStyle: { backgroundColor: '#3777f0' },
	headerTitleStyle: { color: '#fff' },
	headerTitleAlign: 'center',
	headerTintColor: '#FFF'
};

export default function App({ navigation }) {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={globalOption}>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="AddChat" component={AddChat} />
				<Stack.Screen name="Chat" component={Chat} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});
