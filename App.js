import React, {useEffect, useState} from 'react';
import 'react-native-get-random-values';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/views/Home';
import Signup from './src/views/Signup';
import Login from './src/views/Login';
import {TailwindProvider} from 'tailwindcss-react-native';
import Profile from './src/views/Profile';
import Pay from './src/views/Pay';
import PayMe from './src/views/PayMe';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}></Stack.Screen>
           <Stack.Screen
            name="Pay"
            component={Pay}
            options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
            name="PayMe"
            component={PayMe}
            options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};

export default App;
