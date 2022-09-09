import {View, Text, Button, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from './Dashboard';


const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  
  const HomeStack = createNativeStackNavigator();
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused? 'wallet': 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>

        <Tab.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
      </Tab.Navigator>
  );
};

export default Home;
