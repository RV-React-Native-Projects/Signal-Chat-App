import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';

import { db, auth } from '../Firebase';
import firebase from 'firebase/app';

const Chat = ({ navigation, route }) => {
	useLayoutEffect(
		() => {
			navigation.setOptions({
				headerBackTitleVisible: false,
				headerStyle: { backgroundColor: '#393e46' },
				headerTitleStyle: { color: '#FFF' },
				headerTitle: () => (
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text numberOfLines={1} h1 style={{ color: '#FFF', fontWeight: '700', fontSize: 23 }}>
							{route.params.chatName}
						</Text>
					</View>
				),

				headerLeft: () => (
					<TouchableOpacity onPress={navigation.goBack} style={styles.headerleft} activeOpacity={0.6}>
						<AntDesign name="left" size={28} color="#fff" />
						<Avatar
							rounded
							source={{
								uri:
									'https://lh3.googleusercontent.com/-JSB9xKLbgXU/VURliRgTUoI/AAAAAAAAGZk/BancPNGroG0rD89zsKeIB3yeeOqZi0QLgCEwYBhgLKtMDAL1OcqyA3suILUN0eRFE1hkmX1HFdPTEu5MMjnKg_V6R6GphD_6DIDrGWreLZqONlu0Y6jU1airV9IKETQPfCFpLduEvHn9TCzO8GZFbvzspHpxQVapFzF7ZF9sGVC21KP5UYay4c7857gpVyGSEO0azzgHas79npWaRpRQScNhC851G_K1bjS1xRYRiDrhJM1-TICcJWudt1TrTUdjcVxgPZkF17XxUiFyuHO8RxYovsFX6ijNzlofslHlwHFrSTpAg3LKI1AoQD7ccvY3PuGtPxoBCUdAjFGC7Wg6UdvpQNJgfk-ozFxth3R5kVH38B4G68UKRXnW9dAcnT5wXF34hRNkzqNwIKbcSYXkYtNvpG4qVcEdCByW9L3SY4N4RcIW7uxGd4d5Nd9Xxd5-56yPFGUVjaFuKTT-A4o8Mf8dhi5wbb_F1_bX0sMlmeCaNdceYv_ET7sNVztBcJQItWV014U0Fl-oENKjB2Czy1CKBv16pkT9Lg0q944KBIf7EjlMvk8RrjLMWVS4KeY-9ayfor_pr9ugHC_Zr7KRDE8onxagCixQgVFIQ3drXFs8OLG8nSukDgj6LeVtfPpe-hWysA6xlIS3ctLWkpgMQke_yjkAw5_j-hAY/w140-h139-p/Half-Life_Ego-Shooter-Widescreen_Wallpaper.jpg'
							}}
						/>
					</TouchableOpacity>
				),
				headerRight: () => (
					<View style={styles.headerright}>
						<TouchableOpacity activeOpacity={0.6}>
							<FontAwesome5 name="video" size={25} color="#9fe6a0" />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.6}>
							<MaterialIcons name="call" size={25} color="#3edbf0" />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.6} style={{ marginLeft: -10 }}>
							<MaterialCommunityIcons name="dots-vertical" size={25} color="#fff" />
						</TouchableOpacity>
					</View>
				)
			});
		},
		[ navigation ]
	);

	const [ input, setInput ] = useState('');
	const [ messages, setMessages ] = useState([]);

	useLayoutEffect(
		() => {
			const unSubscribe = db
				.collection('Chats')
				.doc(route.params.id)
				.collection('Messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data()
						}))
					)
				);
			return unSubscribe;
		},
		[ route ]
	);

	const sendMessage = () => {
		db.collection('Chats').doc(route.params.id).collection('Messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			Message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL
		});
		setInput('');
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar style="inverted" />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
				keyboardVerticalOffset={90}
			>
				<>
					<ScrollView contentContainerStyle={{ flexDirection: 'column-reverse' }}>
						{messages.map(
							({ id, data }) =>
								data.email === auth.currentUser.email ? (
									<View key={id} style={styles.reciever}>
										<Text style={styles.recieverText}>{data.Message}</Text>
										{/* <Avatar rounded source={{ uri: data.photoURL }} /> */}
									</View>
								) : (
									<View key={id} style={styles.sender}>
										<Avatar rounded source={{ uri: data.photoURL }} />
										<Text style={styles.senderText}>{data.Message}</Text>
										{/* <Text style={styles.sederName}>{data.displayName}</Text> */}
									</View>
								)
						)}
					</ScrollView>
					<View style={styles.footer}>
						<TextInput
							placeholder="Enter Your Message"
							value={input}
							onChangeText={(text) => setInput(text)}
							style={styles.textInput}
							onSubmitEditing={sendMessage}
						/>
						<TouchableOpacity activeOpacity={0.6} onPress={sendMessage} style={styles.sendButton}>
							<Ionicons name="send" size={24} color="#fff" />
						</TouchableOpacity>
					</View>
				</>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Chat;

const styles = StyleSheet.create({
	container: { flex: 1 },
	headerleft: {
		marginLeft: 8,
		width: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	headerright: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 100,
		marginRight: 10
	},
	footer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		padding: 7
	},
	textInput: {
		flex: 1,
		borderRadius: 30,
		fontWeight: '700',
		fontSize: 17,
		padding: 10,
		backgroundColor: '#fff'
	},
	sendButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 48,
		width: 48,
		backgroundColor: '#4aa96c',
		borderRadius: 24,
		marginLeft: 6
	},
	reciever: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		maxWidth: '80%',
		position: 'relative',
		alignSelf: 'flex-end',
		marginRight: 10,
		marginTop: 13
	},
	recieverText: {
		padding: 10,
		backgroundColor: '#e1e5ea',
		borderRadius: 10,
		textAlign: 'left',
		marginRight: 5,
		fontWeight: '600',
		fontSize: 16,
		alignItems: 'center'
	},
	sender: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		maxWidth: '80%',
		position: 'relative',
		alignSelf: 'flex-start',
		marginLeft: 10,
		marginTop: 13
	},
	senderText: {
		padding: 10,
		backgroundColor: '#9fe6a0',
		borderRadius: 10,
		textAlign: 'left',
		marginLeft: 7,
		fontWeight: '600',
		fontSize: 16,
		alignItems: 'center'
	}
});
