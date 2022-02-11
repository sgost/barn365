import React from 'react';
import {NativeBaseProvider, View} from 'native-base';
import Login from './components/Login';

export default function App() {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
}
