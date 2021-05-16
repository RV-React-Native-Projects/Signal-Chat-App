import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

import { AntDesign,Feather } from '@expo/vector-icons';

import CustomeList from '../Components/CustomeList';
import { auth, db } from '../Firebase';

const HomeScreen = ({ navigation }) => {

	const [chat,setChat] =useState([])

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Chats',
			headerStyle: { backgroundColor: '#fff' },
			headerTitleStyle: { color: '#000' },
			headerTintColor: '#000',
			headerLeft:()=>(
				<View style={{marginLeft:25}}>
				<TouchableOpacity  onPress={()=>auth.signOut().then(()=>{ 
						navigation.replace("Login")
					})}  activeOpacity={0.5}>
				<Avatar rounded source={{uri: auth?.currentUser?.photoURL }}/>
				</TouchableOpacity>
				</View>
			),
			headerRight:()=>(
				<View style={{marginRight:25,
				flexDirection:"row",
				width:80,
				justifyContent:"space-between",
				alignItems:"center"}}>
				<TouchableOpacity activeOpacity={0.5}>
					<AntDesign name="camerao" size={30} color="#2978b5" />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.5}>
					<Feather name="edit" size={26} color="#150e56" onPress={()=>navigation.navigate("AddChat")} />
				</TouchableOpacity>
				</View>
			)
		});
	}, [navigation]);

		useEffect(()=>{
		const unSubscribe = db.collection("Chats").onSnapshot(snapshot=>(
			setChat(snapshot.docs.map(doc=>({
				id:doc.id,data:doc.data()
			})))
		))
		return unSubscribe;
	},[])

	const enterChat=(id,chatName)=>{
		navigation.navigate("Chat",{
			id,chatName
		})
	}

	return (
		<SafeAreaView>
			<StatusBar style="auto" />
			<ScrollView style={styles.container}>
			{chat.map(({id,data:{chatName,chatImage}})=>(

				<CustomeList key={id} id={id} chatName={chatName}  enterChat={enterChat} /> 
			))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({container:{
	height:"100%"
}});
