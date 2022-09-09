import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import winkoLogo from '../assets/winko.jpeg';
import auth from '@react-native-firebase/auth';

const PayMe = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [image, setImage] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <View
      className="bg-white"
      style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <View
        className="p-4"
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <QRCode logo={winkoLogo} size={300} value={user.email}/>
        <View className="p-2">
          <Text style={{color: 'black'}}>User Id: {user.email}</Text>
        </View>
      </View>
      <View style={{width: '50%'}}>
        <Button title="Done" color="black" onPress={() => navigation.navigate('Home')}></Button>
      </View>
    </View>
  );
};

export default PayMe;
