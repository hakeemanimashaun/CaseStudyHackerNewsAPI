import { View, Text, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign'



export default function Login({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
     mode="contained" onPress={() => navigation.navigate('Home')}
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
    marginBottom: 20,

  },
  input:{
    margin: 10,
  },
  button:{
    marginTop: 10,
  }
})