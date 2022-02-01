import React, {useState, useEffect} from 'react';
import {Text, View, Button, TextInput, ActivityIndicator} from 'react-native';
import ChatBot from './src/ChatBot';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({navigation, route}) => {
  

  useEffect(() => {
    getData();
  }, [])

  const [getLocalUserID, setGetLocalUserID] = useState('');
  const [getLocalToken, setGetLocalToken] = useState('');

  const getData = () => {
    try {
       AsyncStorage.getItem('USERID').then(value => {
        if (value != null) {
          console.log('newValue', value)
          setGetLocalUserID(value);
        }
    })

     AsyncStorage.getItem('ACCESS_TOKEN').then(value => {
      if (value != null) {
        console.log('newToken', value)
        setGetLocalToken(value);
      }
  })
    } catch(error) {
        console.log(error);
    }
}
  const { USERID } = route.params;
  const { ACCESS_TOKEN } = route.params;

  const USER_sent = USERID ? USERID : getLocalUserID;
  const Token_sent = ACCESS_TOKEN ? ACCESS_TOKEN : getLocalToken;

  return (
    <ChatBot USERID={USER_sent} ACCESS_TOKEN={Token_sent}/>
  )
}
export default Chat;