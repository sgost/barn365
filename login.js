import React, {useState, useEffect} from 'react';
import {Text, View, Button, TextInput, ActivityIndicator} from 'react-native';
// import {styles} from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

  const [userName, setEmail] = useState('');
  const [passWord, setPassword] = useState('');
  const [preAuthData, setPreAuthData] = useState('');
  const [submitData, setSubmitData] = useState('');
  const [userID, setUserID] = useState('');
  const [getLocalUserID, setGetLocalUserID] = useState('');
  const [getLocalToken, setGetLocalToken] = useState('');

  useEffect(() => {
    preAuth();
    getData();
    Navigate();
  }, [])

  //PRE AUTH
  const preAuth = () => {
    fetch(
      'https://dev.barn365.com/api/pre-authentication?email=ta@aei.com&password=Chennai21!',
    )
      .then((response) => response.json())
      .then((json) => setPreAuthData(json));
  }

  //OPTIONS
  const strategy = 'local';
  const questionId = preAuthData.questionId;
  const question = preAuthData.question;
  const utcOffset = '+0530';

  //FINAL SUBMIT
  const contactSubmit = async () => {
    let item = {strategy, questionId, question, userName, passWord, utcOffset};
    let result = await fetch('https://dev.barn365.com/api/authentication', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    result = await result.json();
    setSubmitData(result);
    if (result) {
      result.tenants.map(tenants => {
        tenants.sites.map(sites => {
            sites.houses.map(houses => {
              setUserID(houses.tenantID);
            })
        })
    })
    }
    if (userID != null && submitData.accessToken != null ) {
      await AsyncStorage.setItem('USERID', JSON.stringify(userID));
      await AsyncStorage.setItem('ACCESS_TOKEN', submitData.accessToken);
    }
  }

  const getData = () => {
    try {
       AsyncStorage.getItem('USERID').then(value => {
        if (value != null) {
          setGetLocalUserID(value);
        }
    })

     AsyncStorage.getItem('ACCESS_TOKEN').then(value => {
      if (value != null) {
        setGetLocalToken(value);
      }
  })
    } catch(error) {
        console.log(error);
    }
}

// console.log('USERID', getLocalUserID);
// console.log('TOKEN', getLocalToken);

const Navigate = () => {
  if (getLocalUserID != null && getLocalToken != null) {
    navigation.navigate('Chat')
  }
}

  

  return (
    <View style={{height: '100%', backgroundColor: 'black'}}>
        <View>
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: `90%`}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 10,
                    textAlign: 'center',
                    fontSize: 30,
                  }}>
                  Login
                </Text>
                <View
                  style={{
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      marginBottom: 10,
                    }}>
                    Mail
                  </Text>
                  <TextInput
                    onChangeText={setEmail}
                    value={userName}
                    placeholder="Mail"
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      paddingRight: 5,
                      marginTop: 5,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginBottom: 50,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      margin: 'auto',
                      marginBottom: 10,
                    }}>
                    Password
                  </Text>
                  <TextInput
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={passWord}
                    placeholder="Password"
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      paddingRight: 5,
                      marginTop: 5,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <Button title="Login" onPress={contactSubmit}></Button>
              </View>
            </View>
        </View>
    </View>
  );
};

export default Login;
