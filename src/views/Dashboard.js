import {View, Text, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Dashboard = ({navigation}) => {
  const [balance, setBalance] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [refreshToggle, setToggle] = useState(false)

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if(user){
        getBalance()
    }
  });

  async function getBalance() {
    if(user.email){
      await axios
      .get(
        `https://winko-finance-mvp-server.herokuapp.com/account/balance/${user.email}`,
      )
      .then(response => {
        setBalance(response.data);
      })
      .catch(err => {
        console.error(err);
      });

    }
  }

  function ShowBalance(){
    if(balance == null){
      return  <Text style={{fontSize:100,color: '#000000'}}>loading</Text>; 
    }
    if(balance == 0){
      return <Text style={{fontSize:100,color: '#000000'}}>0</Text>;
    }
    else{
      return <Text style={{fontSize:100,color: '#000000'}}>{parseFloat(balance).toFixed(2)}</Text>
    }
  }

  useEffect(() => { 
    console.log('refresh')
    getBalance()
  }, [refreshToggle])

  function Refresh(){
    if(refreshToggle == true){
      setToggle(false)
    }

    if(refreshToggle == false){
      setToggle(true)
    }
  }

  return (
    <View  style={{height: '100%', alignItems:'center'}}>
      <View style={{width: '99%', flexDirection:'row', justifyContent:'flex-end'}} ><TouchableOpacity onPress={Refresh}><Ionicons name="refresh-outline" color={'black'} size={20}/></TouchableOpacity></View>
      <View style={{width:'80%',height:'100%', alignItems:'center', justifyContent:"space-around"}}>
        <View  style={{flexDirection:'row', alignItems:'baseline'}}><ShowBalance></ShowBalance><Text style={{fontSize:30, color: '#000000'}}>USD</Text></View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <View style={{width:'30%'}}>
          <Button color="#000000" title="Pay" onPress={() => navigation.navigate('Pay')}></Button>
        </View>
        <View style={{width:'30%'}}> 
          <Button color="#000000" title="Recieve" onPress={() => navigation.navigate('PayMe')}></Button>
        </View>
      </View>
      </View>
    </View>
  );
};

export default Dashboard;
