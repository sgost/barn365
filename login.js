import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, ActivityIndicator, Image } from 'react-native';
// import {styles} from "./styles"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( { navigation } ) =>
{

  const [ loading, setLoading ] = useState();

  const [ userName, setEmail ] = useState( '' );
  const [ passWord, setPassword ] = useState( '' );
  const [ preAuthData, setPreAuthData ] = useState( '' );
  const [ submitData, setSubmitData ] = useState( '' );
  const [ userID, setUserID ] = useState( '' );
  const [ getLocalUserID, setGetLocalUserID ] = useState( '' );
  const [ getLocalToken, setGetLocalToken ] = useState( '' );

  useEffect( () =>
  {
    preAuth();
    getData();
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
  const question = preAuthData.question;
  const utcOffset = '+0530';

  //FINAL SUBMIT
  const contactSubmit = async () =>
  {
    let item = { strategy, questionId, question, userName, passWord, utcOffset };
    let result = await fetch( 'https://dev.barn365.com/api/authentication', {
      method: 'POST',
      body: JSON.stringify( item ),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    } );
    result = await result.json();
    setSubmitData( result );
    if ( result )
    {
      result.tenants.map( tenants =>
      {
        tenants.sites.map( sites =>
        {
          sites.houses.map( houses =>
          {
            setUserID( houses.tenantID );
          } )
        } )
      } )
      setLoading( true )
    } else
    {
      setLoading( false )
    }
    if ( userID != null && submitData.accessToken != null )
    {
      await AsyncStorage.setItem( 'USERID', JSON.stringify( userID ) );
      await AsyncStorage.setItem( 'ACCESS_TOKEN', submitData.accessToken );
      getData();
    }
  }

  const getData = () =>
  {
    try
    {
      AsyncStorage.getItem( 'USERID' ).then( value =>
      {
        if ( value != null )
        {
          console.log( 'newValue', value )
          setGetLocalUserID( value );
        }
      } )

      AsyncStorage.getItem( 'ACCESS_TOKEN' ).then( value =>
      {
        if ( value != null )
        {
          console.log( 'newToken', value )
          setGetLocalToken( value );
          navigate();
        }
      } )
    } catch ( error )
    {
      console.log( error );
    }
  }

  const navigate = () =>
  {
    if ( getLocalUserID != null && getLocalToken != null )
    {
        navigation.navigate('Chat', {
        USERID: userID,
        ACCESS_TOKEN: submitData.accessToken ,
      })
      setLoading( false )
    }
  }



  return (
    <View style={ { height: '100%', backgroundColor: '#1e2a5c' } }>
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
                style={ { width: `50%`, height: '10%', marginBottom: 20 } }
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
                    <Button title="Login" color="#1e2a5c" onPress={ contactSubmit }></Button>
                }

              </View>
            </View>
          </View>
      }

    </View>
  );
};

export default Login;
