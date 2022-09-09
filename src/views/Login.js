import { View, Text, Button, TextInput, Image, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import auth from '@react-native-firebase/auth'
import winkoLogo from '../assets/winko.jpeg'

const Login = ({navigation}) => {

  const[email, setEmail] = useState(''); 
  const[password, setPassword] = useState(''); 
  const[errorMsg, setError] = useState('');

  useEffect(() => {
    auth().onAuthStateChanged( user => {
      if(user){
        navigation.navigate('Home')
      }
    })
  }, [])

  const Loginuser = () => {
    auth().signInWithEmailAndPassword(email, password).then((response) => {
      console.log('User account created & signed in!');
      navigation.navigate('Home')
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        console.log('no user found');
        setError('no user found')
      }
  
      if (error.code === 'auth/wrong-password') {
        console.log('wrong password');
        setError('wrong password')
      }
  
      console.error(error);
    });
  }
  
  return (
    
    <View className='items-center bg-white' style={{height: "100%"}}>
      <View className="items-center p-4">
        <Image source={winkoLogo}></Image>
      </View>
      <View className='w-[70%]'>
        <View className='p-2'><TextInput style={{borderWidth:1, color:'black'}} placeholderTextColor="black" className='rounded-lg' placeholder="Email" onChangeText={e => setEmail(e)}></TextInput></View>
        <View className='p-2'><TextInput style={{borderWidth:1, color:'black'}} placeholderTextColor="black" secureTextEntry={true} className='rounded-lg text-black' placeholder="Password" onChangeText={e => setPassword(e)}></TextInput>
      </View>

    <View className='p-2'><Button title='Login' color="#000000" onPress={Loginuser}></Button></View>
    <View className='p-2'><Button title='Register' color="#000000" onPress={() => navigation.navigate('Signup')}></Button></View>
      {errorMsg && <View className='items-center'>
        <Text style={{color:'black'}}>{errorMsg}</Text>
        </View>}
      </View> 
    </View>
  )
}

export default Login