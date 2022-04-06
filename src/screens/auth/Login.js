import { View, Text, StyleSheet } from 'react-native'
import React,{useState, useEffect} from 'react'
import { TextInput, Button } from 'react-native-paper';
import { database } from '../../data/sqliteStorage/database';
import { createTable } from '../../data/sqliteStorage/database';





export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 

  useEffect(()=>{
    createTable()
  }, []);

  const navigate = async () => {
    try {
      await database.transaction(async (tx) => {
        tx.executeSql(
          "INSERT INTO Users (email, password) VALUES (?,?)",
          [email, password],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
          }
        );
      });
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
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
      keyboardType='visible-password'
      value={password}
      onChangeText={text => setPassword(text)}
      mode='outlined' 
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