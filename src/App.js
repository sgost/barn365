import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import Login from './components/Login';

export default function App() {
    console.log("Debugger Enabled")
    return (
        <NativeBaseProvider>
            <Login />
        </NativeBaseProvider>
    );
}