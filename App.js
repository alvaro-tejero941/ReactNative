import { StatusBar } from 'expo-status-bar';
import Registro from "./Register/Register";
import React, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { Button, StyleSheet, Text,TextInput, View,ToastAndroid,ActivityIndicator,FlatList,Image } from 'react-native';
import { navigation } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();



export default function App() {  

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={login}
          //options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Register" component={Register} /> 
        <Stack.Screen name="details" component={details}/>        
      </Stack.Navigator>
    </NavigationContainer>         
  );
}

    

  const login = ({ navigation }) =>{
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    return(
      <View style={styles.container}>
          <Text style={{marginBottom:20,fontSize:30}}>Login</Text>
          <Text style={{marginBottom:20}}>Nombre</Text>    
          <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300}} onChangeText={(val)=>setUser(val)} type="text" Placeholder="Nombre"></TextInput>
          <Text style={{marginTop:10}}>Password</Text>
          <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15, marginBottom:25}} onChangeText={(val)=>setPassword(val)} type="password" Placeholder="id"></TextInput>      
          <Button title="Acceder" onPress={() => alert("nombre "+ user + " password "+password)} style={{}}></Button>
          <Button title="Registrate" onPress={() => navigation.navigate( Register,{ name: 'Jane' })} style={{}}></Button>
          <StatusBar style="auto" />          
        </View>        
    );    
  }


  function Register  ({ navigation }) {    
    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

  useEffect(() => {
    fetch('https://gateway.marvel.com/v1/public/characters?limit=10&apikey=4e892c080bf2a6e7af14172a184981e0&ts=9&hash=0ef2af7eadd56ff1591a935c0311f402')
      .then((response) => response.json())      
      .then((json) => setData(json.data.results))
      .then((json) => setList(json.data.results.urls))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  },[]);
    
    
    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator/> : (                
          <FlatList 
            style={styles.list}
            data={data}
            numColumns={3}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
            <View>            
              <Text style={styles.item}>{item.name},    {item.modified}, {'\n'}  {item.description}  
              <Image style={styles.image} source={item.thumbnail.path+".jpg"} ></Image>              
              </Text>        
              <Button title={'vista detallada'} style={styles.button} onPress={() => navigation.navigate( 'details',{title: item.name, date:item.modified , description:item.description ,pic:item.thumbnail.path })}></Button>
            </View>
            )}
          />              
        )}          
      </View>
      );
  }
  
  
  function details ({route}) {
    const {title,date,description,pic} = route.params
    const url = pic;
    return(
      <View style={styles.details}>        
        <Text style={styles.textDetailTop}>Info Comic</Text>
          <Text style={styles.textDetail}>Titulo:  {JSON.stringify(title)}</Text>
          <Text style={styles.textDetail}>fecha:   {JSON.stringify(date)}</Text>
          <Text style={styles.textDetail}>descripcion:   {JSON.stringify(description)}</Text>
          <Image source={{uri: url + '.jpg'}} style={styles.imageDetail}></Image>
      </View>
    )
  }
  

  const GreetingsAndroid = () =>{
    ToastAndroid.show("Bienvenido, "+user, ToastAndroid.SHORT);
  };

  const greetingsPC = () =>{
  alert("nombre "+ user + " password "+password)
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {        
    paddingLeft:25,
    textAlign:"center",
    margin:'auto',
    
  },
  textDetail:{
    textAlign:"center",        
  },
  textDetailTop:{
    textAlign:"center",
    fontFamily:'bold',
    fontSize:20,
    marginBottom:20,
    marginTop:100,    
  },
  item: {
    color:'white',
    backgroundColor:'#5a6cb8',
    borderRadius:23,
    width:400,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingLeft:10,
    marginLeft:10,
  },
  title: {
    fontSize: 32,
  },
  image:{
    backgroundColor:'#5a6cb8',
    height:200,
    width:200,
    marginLeft: 20,
  },
  button:{
    marginTop:20,
    height:200,
    width:300,
        
  },
  details:{
    width:500,
    height:1500,
    marginLeft:760,
  },
  imageDetail:{    
    height:200,
    width:200,
    marginLeft: 150,
    marginTop:20
  },
});
