import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { db } from '../Firebase';

const CustomeList = ({ id, chatName, enterChat }) => {
	const [ chatMessages, setChatMessages ] = useState([]);

	useEffect(() => {
		const unSubscribe = db
			.collection('Chats')
			.doc(id)
			.collection('Messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => setChatMessages(snapshot.docs.map((doc) => doc.data())));
		return unSubscribe;
	}, []);
	return (
		<TouchableOpacity key={id} onPress={() => enterChat(id, chatName)} activeOpacity={0.7} key={id}>
			<ListItem key={id}>
				<Avatar rounded source={{ uri:
				chatMessages?.[0]?.photoURL ||'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' 
				}}
				 />
				<ListItem.Content>
					<ListItem.Title style={{ fontWeight: '700' }}>{chatName}</ListItem.Title>
					<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
						{/* {chatMessages?.[0]?.displayName}: */}
						{chatMessages?.[0]?.Message}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		</TouchableOpacity>
	);
};

export default CustomeList;

const styles = StyleSheet.create({});
