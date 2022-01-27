import React, { useState } from "react";
import App from "./src/App";
import { Text, View, Button, TextInput } from 'react-native';
// import {styles} from "./styles"

const Apps = () =>
{

  const contactSubmits = () =>
  {
    preAuth()
    contactSubmit()
  }


  const [ userName, setEmail ] = useState( "" );
  const [ passWord, setPassword ] = useState( "" );
  const [ data, setData ] = useState( "" );
  const [ finalData, setFinalData ] = useState( "" );


  const preAuth = () =>
  {
    fetch( 'https://dev.barn365.com/api/pre-authentication?email=ta@aei.com&password=Chennai21!' ).then( response => response.json()
    ).then( json => setData( json ) )
  }




  const strategy = "local";
  const questionId = null;
  const question = data.question;
  const utcOffset = "+0530";

  async function contactSubmit ()
  {
    let item = { strategy, questionId, question, userName, passWord, utcOffset }

    let result = await fetch( "https://dev.barn365.com/api/authentication", {
      method: "POST",
      body: JSON.stringify( item ),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    } )
    result = await result.json()
    setFinalData( result )
    if ( result.accessToken )
    {
      alert( 'Login Success' )
    } else
    {
      alert( "error" )
    }
  }

  const accessToken = finalData.accessToken;


  return (
    <View style={ { backgroundColor: 'black', height: '100%' } }>
      {
        accessToken ?
          <App />
          :
          <View style={ { height: '100%', alignItems: 'center', justifyContent: 'center', } }>
            <View style={ { width: `90%` } }>
              <Text style={ {
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
                fontSize: 30,
              } }>Login</Text>
              <View style={ {
                marginBottom: 20,
              } }>
                <Text style={ {
                  fontSize: 16,
                  fontWeight: '600',
                  marginBottom: 10,
                } }>Mail</Text>
                <TextInput onChangeText={ setEmail }
                  value={ userName } placeholder="Mail" style={ {
                    borderWidth: 1,
                    borderColor: 'gray',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginTop: 5,
                    borderRadius: 5,
                  } } />
              </View>
              <View style={ {
                marginBottom: 50,
              } }>
                <Text style={ {
                  fontSize: 16,
                  fontWeight: '600',
                  margin: 'auto',
                  marginBottom: 10,
                } }>Password</Text>
                <TextInput onChangeText={ setPassword }
                  value={ passWord } placeholder="Password"
                  style={ {
                    borderWidth: 1,
                    borderColor: 'gray',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 5,
                    paddingRight: 5,
                    marginTop: 5,
                    borderRadius: 5,
                  } } />
              </View>
              <Button title="Login" onPress={ contactSubmits }></Button>
            </View>
          </View>
      }
    </View>
  );
};

export default Apps;
