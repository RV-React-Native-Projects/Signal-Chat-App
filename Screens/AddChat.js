import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Input } from 'react-native-elements/dist/input/Input';

import { db } from '../Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddChat = ({ navigation }) => {
	const [ input, setInput ] = useState('');
	// const [ imInput, setImInput ] = useState('');
	const CreateChat = async () => {
		await db
			.collection('Chats')
			.add({
				chatName: input
				// chatImage: imInput
			})
			.then(() => {
				navigation.goBack();
			})
			.catch((error) => alert(error));
	};
	useLayoutEffect(
		() => {
			navigation.setOptions({
				title: 'Create a New Chat',
				headerStyle: { backgroundColor: '#fff' },
				headerTitleStyle: { color: '#000' },
				headerTintColor: '#000'
			});
		},
		[ navigation ]
	);

	return (
		<View style={styles.conatiner}>
			<Input
				style={styles.input}
				autoFocus
				placeholder="Enter Chat Title"
				value={input}
				onChangeText={(text) => setInput(text)}
				leftIcon={<Entypo name="chat" size={24} color="#289672" />}
				// onSubmitEditing={CreateChat}
			/>
			{/* <Input
				style={styles.input}
				placeholder="Enter the Image URL ( Optional )"
				value={imInput}
				onChangeText={(text) => setImInput(text)}
				leftIcon={<AntDesign name="link" size={24} color="#04009a" />}
				onSubmitEditing={CreateChat}
			/> */}
			<TouchableOpacity disabled={!input} onPress={CreateChat} style={styles.button}>
				<Text style={styles.buttonText}>Create new Chat</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddChat;

const styles = StyleSheet.create({
	conatiner: {
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 20,
		height: '100%'
	},
	button: {
		backgroundColor: '#4ca1a3',
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: 400,
		minWidth: 250,
		width: '100%',
		padding: 20,
		borderRadius: 8
	},
	input: {
		maxWidth: 750
	},
	buttonText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 20
	}
});
