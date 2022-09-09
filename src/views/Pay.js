import { View, Text, Button, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import auth from '@react-native-firebase/auth'
import { NavbarBrand } from 'reactstrap'


const Pay = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const[errorMsg, setError] = useState('');

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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

  async function Transfer(){
    console.log('tx')
    console.log(user.email)
    console.log(email)
    console.log(amount)
    if(user && email && amount){
      console.log('done')
      await axios.post('https://winko-finance-mvp-server.herokuapp.com/account/tx', {
        sender:user.email, 
        reciever:email, 
        amount:amount
    }).then((response)=>{
      setError('Transfer Successful ✅')
      navigation.navigate('Home')
    }).catch((err) => console.error(err))
    }
  }

  return (
    <View className='items-center bg-white' style={{height: "100%"}}>
      <View className="items-center p-10">
      </View>
      <View className='w-[70%]'>
        <View className='p-2'><TextInput style={{borderWidth:1, color:'black'}} placeholderTextColor="black" className='rounded-lg' placeholder="Receivers email" onChangeText={e => setEmail(e)}></TextInput></View>
        <View className='p-2'><TextInput style={{borderWidth:1, color:'black'}} placeholderTextColor="black" className='rounded-lg text-black' placeholder="Amount" onChangeText={e => setAmount(e)}></TextInput>
      </View>

    <View className='p-2'><Button title='Pay' color="#000000" onPress={Transfer}></Button></View>
      {errorMsg && <View className='items-center'>
        <Text style={{color:'black'}}>{errorMsg}</Text>
        </View>}
      </View> 
    </View>
  )
}

export default Pay