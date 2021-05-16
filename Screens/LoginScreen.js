import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../Firebase';

const LoginScreen = ({ navigation }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	useEffect(
		() => {
			const unsubscribe = auth.onAuthStateChanged((authUser) => {
				// console.log(authUser);
				if (authUser) {
					navigation.replace('Home');
				}
			});
			return unsubscribe;
		},
		[ 1000 ]
	);
	const SignIn = () => {
		auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));
	};
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<StatusBar style="light" />
			<Text style={styles.maintext}>Private chat for your Privercy</Text>
			<Image
				source={{ uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png' }}
				style={{ width: 230, height: 230 }}
			/>
			<View style={styles.inputs}>
				<Text style={styles.labels}>Email</Text>
				<TextInput
					autoFocus
					style={styles.inputfields}
					keyboardType="email-address"
					autoCompleteType="email"
					placeholder="Email"
					type="email"
					textContentType="emailAddress"
					value={email}
					onChangeText={(email) => setEmail(email)}
				/>
				<Text style={styles.labels}>Password</Text>
				<TextInput
					style={styles.inputfields}
					keyboardType="default"
					autoCompleteType="password"
					placeholder="Password"
					secureTextEntry
					type="password"
					textContentType="password"
					value={password}
					onChangeText={(password) => setPassword(password)}
					onSubmitEditing={SignIn}
				/>
			</View>
			<View style={styles.Buttons}>
				<TouchableOpacity style={styles.opacityButtons} onPress={SignIn}>
					<Text style={styles.ButtonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.opacityButtonsReg} onPress={() => navigation.navigate('Register')}>
					<Text style={styles.ButtonText}>Register Now</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	maintext: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 35
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2188e1'
	},
	inputs: {
		width: '95%',
		maxWidth: 600
	},
	inputfields: {
		backgroundColor: '#fff',
		marginBottom: 10,
		padding: 8,
		fontSize: 20,
		borderRadius: 5
	},
	labels: {
		fontSize: 17,
		color: '#fff',
		marginBottom: 5,
		fontWeight: '600'
	},
	Buttons: {
		maxWidth: 350,
		minWidth: 300
	},
	opacityButtons: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000',
		marginTop: 10,
		padding: 12,
		borderRadius: 7
	},
	opacityButtonsReg: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		padding: 10,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: '#ffd56b'
	},
	ButtonText: {
		fontWeight: '600',
		fontSize: 20,
		color: '#fff'
	}
});
