import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text,TextInput, View,ToastAndroid } from 'react-native';

export default function App() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');


  const GreetingsAndroid = () =>{
    ToastAndroid.show("Bienvenido, "+user, ToastAndroid.SHORT);
  };

  const greetingsPC = () =>{
  alert("nombre "+ user + " password "+password)
  };

  return (
    <View style={styles.container}>
      <Text style={{marginBottom:20,fontSize:30}}>Registro</Text>
      <Text style={{marginBottom:20}}>Nombre</Text>    
      <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300}} onChangeText={(val)=>setUser(val)} type="text" Placeholder="Nombre"></TextInput>
      <Text style={{marginTop:10}}>Password</Text>
      <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15, marginBottom:25}} onChangeText={(val)=>setPassword(val)} type="password" Placeholder="id"></TextInput>      
      <Button title="Registro" onPress={() => greetingsPC()} style={{}}></Button>
      <StatusBar style="auto" />
    </View>
  );
}







  const comentario = () =>{
    <view>
    <Text style={{marginTop:10}}>Precio</Text>
      <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15}} type="text" Placeholder="precio"></TextInput>
      <Text style={{marginTop:10}}>Dia de Compra</Text>
      <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15}} type="text" Placeholder="dateBuy"></TextInput>
      <Text style={{marginTop:10}}>Dia de Expiracion</Text>
      <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15}} type="text" Placeholder='dateExp'></TextInput>
      <Text style={{marginTop:10}}>Url</Text>
      <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15,marginBottom:25}} type="text" Placeholder="dateBuy"></TextInput>
      </view>
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});