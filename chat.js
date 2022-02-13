import React from 'react';
import ChatBot from './src/ChatBot';
import Header from './src/header';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ navigation, route }) => {

  const { USERID } = route.params;
  const { ACCESS_TOKEN } = route.params;
      //Remove Data To Local Storage
      const RemoveData = async () =>
      {
        try
        {
          await AsyncStorage.removeItem( 'ITEM' );
          navigation.navigate('Login')
        } catch ( error )
        {
          console.log( error );
        }
      }

  return (
    <View style={{height: "100%"}}>
    <Header RemoveData={RemoveData}/>
    <ChatBot USERID={USERID} ACCESS_TOKEN={ACCESS_TOKEN}/>
    </View>
  )
}
export default Chat;