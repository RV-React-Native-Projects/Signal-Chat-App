import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../Firebase';

const RegisterScreen = ({ navigation }) => {
	const [ fullName, setFullName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ image, setImage ] = useState('');

	useLayoutEffect(
		() => {
			navigation.setOptions({
				headerBackTitle: 'Login'
			});
		},
		[ navigation ]
	);

	const SignUp = () => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				authUser.user.updateProfile({
					displayName: fullName,
					photoURL: image || 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
				});
			})
			.catch((error) => alert(error.message));
	};

	return (
		<KeyboardAvoidingView behavior="height" style={styles.container}>
			<Text h3 style={styles.Toptext}>
				Create An Account Now
			</Text>
			<View style={styles.inputs}>
				<Text style={styles.topLables}>Full Name</Text>
				<TextInput
					style={styles.inputfields}
					keyboardType="default"
					autoCompleteType="username"
					placeholder="Full Name"
					type="Text"
					textContentType="username"
					autoFocus
					value={fullName}
					onChangeText={(fullName) => setFullName(fullName)}
				/>
				<Text style={styles.topLables}>Email</Text>
				<TextInput
					style={styles.inputfields}
					keyboardType="email-address"
					autoCompleteType="email"
					placeholder="Email"
					autoCapitalize="none"
					textContentType="emailAddress"
					value={email}
					onChangeText={(email) => setEmail(email)}
				/>
				<Text style={styles.topLables}>Password</Text>
				<TextInput
					style={styles.inputfields}
					keyboardType="default"
					autoCompleteType="off"
					secureTextEntry
					placeholder="Password"
					textContentType="password"
					value={password}
					onChangeText={(password) => setPassword(password)}
				/>
				<Text style={styles.topLables}>Profile Picture Url (Optional)</Text>
				<TextInput
					style={styles.inputfields}
					keyboardType="default"
					placeholder="Enter Url"
					textContentType="URL"
					value={image}
					onChangeText={(image) => setImage(image)}
				/>
			</View>
			<View style={styles.Buttons}>
				<TouchableOpacity style={styles.opacityButtons} onPress={SignUp}>
					<Text style={styles.ButtonText}>Sign UP</Text>
				</TouchableOpacity>
				<Text style={styles.haveAccount}>Already Have an Account ?</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.opacityButtonsReg}>
					<Text style={styles.ButtonText2}>Login Now</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	inputs: {
		width: '95%',
		maxWidth: 600
	},
	inputfields: {
		backgroundColor: '#f3f4ed',
		marginBottom: 10,
		padding: 8,
		fontSize: 20,
		borderRadius: 5
	},
	Toptext: {
		marginVertical: 20,
		fontSize: 28,
		fontWeight: '700'
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
		backgroundColor: '#440a67',
		marginTop: 10,
		padding: 12,
		borderRadius: 7
	},
	opacityButtonsReg: {
		// display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	ButtonText: {
		fontWeight: '600',
		fontSize: 20,
		color: '#fff'
	},
	ButtonText2: {
		fontWeight: '800',
		fontSize: 22,
		color: '#93329e'
	},
	haveAccount: {
		color: '#000',
		marginBottom: 10,
		fontSize: 15,
		fontWeight: '700',
		textAlign: 'center',
		marginTop: 20
	},
	topLables: {
		fontWeight: '700',
		fontSize: 16
	}
});
