import React from 'react';
import ChatBot from './src/ChatBot';

const Chat = ({ route }) => {

  const { USERID } = route.params;
  const { ACCESS_TOKEN } = route.params;

  return (
    <ChatBot USERID={USERID} ACCESS_TOKEN={ACCESS_TOKEN}/>
  )
}
export default Chat;




// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, TextInput, ActivityIndicator, Image, DrawerLayoutAndroid, StyleSheet } from 'react-native';
// import ChatBot from './src/ChatBot';

// const Chat = ( { navigation, route } ) =>
// {

//   // const { USERID } = route.params;
//   // const { ACCESS_TOKEN } = route.params;

//   const drawer = useRef( null );


//   const navigationView = () => (
//     <View style={ [ styles.container, styles.navigationContainer ] }>
//       <Text style={ { color: 'white', position: 'absolute', top: 10, right: 20 } } onPress={ () => drawer.current.closeDrawer() }>X</Text>
//       <Image
//         style={ { width: 30, height: 30, borderRadius: 30, marginBottom: 10, marginTop: 50, resizeMode: 'stretch', marginLeft: 'auto',
//       } }
//         source={ {
//           uri: 'https://www.barn365.com/static/media/logo-big.21fc072a.jpg',
//         } }
//       />
//       <Text style={ styles.paragraph }>Manoj Ponugoti</Text>
//       <Button
//         title="Close drawer"
//         onPress={ () => drawer.current.closeDrawer() }
//       />
//     </View>
//   );

//   return (
//     // <ChatBot USERID={USERID} ACCESS_TOKEN={ACCESS_TOKEN}/>

//     <DrawerLayoutAndroid
//       ref={ drawer }
//       drawerWidth={ 300 }
//       drawerPosition={ "left" }
//       renderNavigationView={ navigationView }
//     >
//       <View style={ styles.container }>
//         <Button
//           title="Open drawer"
//           onPress={ () => drawer.current.openDrawer() }
//         />
//       </View>
//     </DrawerLayoutAndroid>
//   )
// }

// const styles = StyleSheet.create( {
//   container: {
//     flex: 1,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: 'red',
//     position: 'relative',
//   },
//   navigationContainer: {
//     backgroundColor: "#1e2a5c"
//   },
//   paragraph: {
//     fontSize: 15,
//     textAlign: "right",
//     top: 0,
//     marginBottom: 30, 
//     color: 'white',
//   }
// } );
// export default Chat;