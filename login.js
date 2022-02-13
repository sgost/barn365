import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StatusBar, ActivityIndicator, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( { navigation } ) =>
{

  const [ loading, setLoading ] = useState();
  const [ userName, setEmail ] = useState( '' );
  const [ passWord, setPassword ] = useState( '' );
  const [ preAuthData, setPreAuthData ] = useState( '' );

  useEffect( () =>
  {
    preAuth();
    GetData();
  }, [] )

  //PRE AUTH
  const preAuth = () =>
  {
    fetch(
      'https://dev.barn365.com/api/pre-authentication?email=ta@aei.com&password=Chennai21!',
    )
      .then( ( response ) => response.json() )
      .then( ( json ) => setPreAuthData( json ) );
  }

  //OPTIONS
  const strategy = 'local';
  const questionId = preAuthData.questionId;
  const answer = preAuthData.question;
  const utcOffset = '+0530';

  let item = { strategy, questionId, answer, userName, passWord, utcOffset };

    //Send Data To Local Storage
  const PutData = async () =>
  {
    try
    {
      await AsyncStorage.setItem( 'ITEM', JSON.stringify(item) )
      GetData();
    } catch ( error )
    {
      console.log( error );
    }
  }

  //GET Data To Local Storage

  const GetData = () =>
  {
    try
    {
      AsyncStorage.getItem( 'ITEM' ).then( value =>
      {
        if ( value != null )
        {
          contactSubmit(value);
        }
      } )
    } catch ( error )
    {
      console.log( error );
    }
  }


  //FINAL SUBMIT
  const contactSubmit = async (bodyData) =>
  {
    if (bodyData != null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    let result = await fetch( 'https://dev.barn365.com/api/authentication', {
      method: 'POST',
      body: bodyData,
      headers: {
       'Content-Type': 'application/json',
      },
    } );
    result = await result.json();
    if ( result.accessToken != null )
    {
      result.tenants.map( tenants =>
      {
        tenants.sites.map( sites =>
        {
          sites.houses.map( houses =>
          {
            nav(houses.tenantID, result.accessToken);
          } )
        } )
      } )
      setLoading(false);
    } else {
      setLoading( false )
      alert(result.message);
    }
  }

  const nav = (userIDs, accessTokens) => {
    navigation.navigate('Chat', {
      USERID: userIDs,
      ACCESS_TOKEN: accessTokens,
    })
  }



  return (

    <View style={ { height: '100%', backgroundColor: '#1e2a5c' } }>
          <StatusBar
        animated={true}
        backgroundColor="#1e2a5c"
        hidden={false} />
      {
        loading ?
        <ActivityIndicator size="large" color="white" style={{top: '50%'}}/>
          :
          <View>
            <View
              style={ {
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              } }>
              <Image
                style={ { width: `50%`, height: '10%', marginBottom: 20, resizeMode: 'stretch' } }
                source={ {
                  uri: 'https://www.barn365.com/static/media/logo-big.21fc072a.jpg',
                } }
              />
              <View style={ { width: `90%`, backgroundColor: 'white', borderRadius: 10, padding: 20 } }>
                <View
                  style={ {
                    marginBottom: 20,
                  } }>
                  <Text
                    style={ {
                      fontSize: 16,
                      fontWeight: '600',
                      marginBottom: 10,
                      color: '#9A9A9A',
                    } }>
                    User Name
                  </Text>
                  <TextInput
                    onChangeText={ setEmail }
                    value={ userName }
                    placeholder="Mail"
                    style={ {
                      borderWidth: 1,
                      borderColor: '#DDDDDD',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      paddingRight: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: 'black',
                    } }
                  />
                </View>
                <View
                  style={ {
                    marginBottom: 50,
                  } }>
                  <Text
                    style={ {
                      fontSize: 16,
                      fontWeight: '600',
                      margin: 'auto',
                      marginBottom: 10,
                      color: '#9A9A9A',
                    } }>
                    Password
                  </Text>
                  <TextInput
                    secureTextEntry={ true }
                    onChangeText={ setPassword }
                    value={ passWord }
                    placeholder="Password"
                    style={ {
                      borderWidth: 1,
                      borderColor: '#DDDDDD',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      paddingRight: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      color: 'black',
                    } }
                  />
                </View>
                {
                  !userName || !passWord ?
                    <Button title="Login" color="gray"></Button>
                    :
                    <Button title="Login" color="#1e2a5c" onPress={ PutData }></Button>
                }

              </View>
            </View>
          </View>
      }
      

    </View>
  );
};

export default Login;