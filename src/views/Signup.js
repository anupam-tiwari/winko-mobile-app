import { View, Text, Button, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import auth, {firebase} from '@react-native-firebase/auth';
import axios from "axios"
import winkoLogo from '../assets/winko.jpeg'


const Signup = ({navigation}) => {

  const[email, setEmail] = useState(''); 
  const[password, setPassword] = useState(''); 
  const[errorMsg, setError] = useState('');

  const CreateUser = async () => {
    console.log(email)
    console.log(password)
    await auth().createUserWithEmailAndPassword(email,password).then((response) => {
      console.log('User account created & signed in!');
      axios.post("https://winko-finance-mvp-server.herokuapp.com/auth/register", {
        email:email
      }).then((response) => {
        console.log(response.data)
        navigation.navigate('Home')
      }).catch((err) => {
        console.log(err)
      })
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        setError('That email address is already in use!')
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        setError('That email address is invalid!')
      }
  
      console.error(error);
    });
  }

  return (
    <View className='bg-white items-center' style={{height: "100%"}}>
      <View className="items-center p-4">
        <Image source={winkoLogo}></Image>
      </View>

      <View className='w-[70%] '>
        <View className='p-2'><TextInput style={{borderWidth:1, color:'black'}} placeholderTextColor="black" className='rounded-lg' placeholder="Email" onChangeText={e => setEmail(e)}></TextInput></View>
        <View className='p-2'><TextInput style={{borderWidth:1, color:'black'}} placeholderTextColor="black" className='rounded-lg' placeholder="Password" onChangeText={e => setPassword(e)}></TextInput></View>
      </View>

      <View className='p-2 w-[70%]'><Button title='Signup' color="#000000" onPress={CreateUser}></Button></View>
      {errorMsg && <View className='items-center'>
        <Text style={{color:'black'}}>{errorMsg}</Text>
        </View>}
    </View>
  )
}

export default Signup