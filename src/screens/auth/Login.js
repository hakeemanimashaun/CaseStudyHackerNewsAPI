import { View, Text, StyleSheet } from 'react-native'
import React,{useState, useEffect} from 'react'
import { TextInput, Button } from 'react-native-paper';
import { database } from '../../data/sqliteStorage/database';
import { createTable } from '../../data/sqliteStorage/database';





export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);

 

  useEffect(()=>{
    createTable()
  }, []);

 const navigate = () => {
   database.transaction( (tx)=>{
    tx.executeSql(
      `INSERT INTO Users (email, password) VALUES (?,?)`,
      [email, password],
      (sqlTx, res)=>{
          console.log(`${email, password} added succesfully to Users`)
          navigation.navigate('Home');
      },
      error => {console.log("failed to add because:" + error.message)}
  )
   }
  )
 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
      style={styles.input}
      label="Email"
      keyboardType='email-address'
      value={email}
      mode='outlined'
      onChangeText={text => setEmail(text)}
      placeholder='type email'
    />
      <TextInput
      style={styles.input}
      label="Password"
      keyboardType='numbers-and-punctuation'
      value={password}
      onChangeText={text => setPassword(text)}
      mode='outlined'
      // right={<TextInput.Icon name={'eye'}/>}
      placeholder='enter password'
    />
    <Button
    style={styles.button}
     mode="contained" onPress={()=>navigate()}
    >
      press me
    </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  title:{
    textAlign: 'center',
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  input:{
    margin: 10,
  },
  button:{
    margin: 10,
  }
})