import { navigation } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState } from 'react';
import { Button, StyleSheet, Text,TextInput, View,ToastAndroid,FlatList,TouchableOpacity,SafeAreaView,ActivityIndicator,Linking,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const [user, setUser] = useState('');
  const [id, setId] = useState('');
  const [purchase, setPurchase] = useState('');
  const [expiration, setExpiration] = useState('');
  const [url, setUrl] = useState('');
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const [list, setList] = useState([])

  const append = '?apikey=4e892c080bf2a6e7af14172a184981e0&ts=9&hash=0ef2af7eadd56ff1591a935c0311f402'
  
  const Stack = createStackNavigator();
  
  
  const GreetingsAndroid = () =>{
    ToastAndroid.show("Bienvenido, "+user, ToastAndroid.SHORT);
  };

  const greetingsPC = () =>{
    alert("nombre:"+ user + " id:"+id +"Dia de compra:"+purchase+"Dia de expiracion:"+expiration+"Url:"+Url)
  };


  useEffect(() => {
    fetch('https://gateway.marvel.com/v1/public/characters?limit=10&apikey=4e892c080bf2a6e7af14172a184981e0&ts=9&hash=0ef2af7eadd56ff1591a935c0311f402')
      .then((response) => response.json())      
      .then((json) => setData(json.data.results))
      .then((json) => setList(json.data.results.urls))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  },[]);
  

 
  function Detalle ({route}) {
    const {name,id,purchase,exp,url} = route.params
    return(
      <View style={styles.container}>
        <Text>Info Comic</Text>
          <Text>Nombre: {JSON.stringify(name)}</Text>
          <Text>id: {JSON.stringify(id)}</Text>
          <Text>Dia de compra: {JSON.stringify(purchase)}</Text>
          <Text>Dia de expiracion: {JSON.stringify(exp)}</Text>
          <Text>url: {JSON.stringify(url)}</Text>
      </View>
    )
  }

 

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
            <Button onPress={() => navigation.navigate(Detalle,{name: item.user})}> vista detallada</Button>
            </Text>        
          </View>
          )}
        />              
      )}          
    </View>
    );
};

  {
    /*
      
    /**

            parte de API Marvel
            URL MARVEL JSON:  https://gateway.marvel.com/v1/public/characters?apikey=4e892c080bf2a6e7af14172a184981e0&ts=9&hash=0ef2af7eadd56ff1591a935c0311f402
            el enlace de arriba devuelve un json con todos los comics de la bbdd

          
    links React: {onPress={() => Linking.openURL(item.urls.url)}

    Lista 

    const data =[
    {
      user: "alvaro",
      id: "1",
      purchase: "27/05/1923",
      expiration: "27/05/1926",
      Url:"www.alvaro.com"
    }
  ]

    <View style={styles.container}>
    <Text style={{marginBottom:20,fontSize:30}}>Registro</Text>
    <Text style={{marginBottom:20}}>Nombre</Text>    
    <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300}} onChangeText={(val)=>setUser(val)}  type="text" Placeholder="Nombre"></TextInput>
    <Text style={{marginTop:10}}>Id</Text>
    <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15, marginBottom:25}} onChangeText={(val)=>setId(val)} type="password" Placeholder="id"></TextInput>
    <Text style={{marginTop:10}}>Dia de Compra</Text>
    <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15}} onChangeText={(val)=>setPurchase(val)} type="text" Placeholder="dateBuy"></TextInput>
    <Text style={{marginTop:10}}>Dia de Expiracion</Text>
    <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15}}  onChangeText={(val)=>setExpiration(val)} type="date" Placeholder='dateExp'></TextInput>
    <Text style={{marginTop:10}}>Url</Text>
    <TextInput style={{borderBottomColor: '#0BE2F2',borderBottomWidth: 1,width :300, marginTop:15,marginBottom:25}} onChangeText={(val)=>setUrl(val)} type="text" Placeholder="dateBuy"></TextInput>

    <Button title="Registro" onPress={() => greetingsPC()} style={{marginBottom:25}}></Button>

    <Button title="Login" onPress={() => greetingsPC()} style={{}}></Button>
    <StatusBar style="auto" />
    <SafeAreaView style={styles.container}>
    <FlatList
      data={[{
      user,
      id,
      purchase: "27/05/1923",
      expiration: "27/05/1926",
      url:"www.alvaro.com"}]}
      renderItem={({item})=>(
      <TouchableOpacity onPress={() => navigation.navigate('detalle',{name: item.user, id: item.id, compra:item.purchase, expiracion:item.expiration , url: item.url })}>
      <Text style={styles.item}>{item.user}</Text>      
    </TouchableOpacity>
    )}
      keyExtractor={(item) => item.user}                          
    />
    </SafeAreaView>
  </View>


    const Item = ({ item, onPress, style }) => (   
    <TouchableOpacity onPress={() => navigation.navigate('detalle',{name: item.user, id: item.id, compra:item.purchase, expiracion:item.expiration , url: item.url })} style={[styles.item, style]}>
      <Text style={styles.title}>{item.user}</Text>      
    </TouchableOpacity>   
  );

       const renderItem = ({ item }) => {
    const backgroundColor = item.user === user ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        onPress={() => setUser(item.user)}
        style={{ backgroundColor }}
      />
    );
  };  
            
    */
  }

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',      
    justifyContent: 'center',    
  },
  list: {        
    paddingLeft:25,
    textAlign:"center",
    margin:'auto',
    
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
    //marginLeft: 89,
  },
  details:{
    width:500,
    height:5000,
    overflow: 'hidden',
    alignItems: 'center',      
    justifyContent: 'center', 
  },

  
});