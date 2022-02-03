import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Header = ({RemoveData}) => {
   

  return (
      <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#1e2a5c"
        hidden={false} />
      {Platform.OS === 'ios' ? (
        <Text style={styles.textStyle}>
          StatusBar Transition:{'\n'}
          {statusBarTransition}
        </Text>
      ) : null}
      <View style={styles.buttonsContainer}>
      <FontAwesome5 name={'bars'} size={30} color={'white'}/>
      <TouchableOpacity onPress={RemoveData}>
      <Text style={{color: 'white', fontSize: 12}}>Logout</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#1e2a5c'
  },
  buttonsContainer: {
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textStyle: {
    textAlign: 'center',
  }
});
export default Header;
