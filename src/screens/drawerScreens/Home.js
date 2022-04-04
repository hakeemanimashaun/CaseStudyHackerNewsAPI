import { View, Text, StyleSheet, FlatList, ScrollView  } from 'react-native'
import React,{useState} from 'react'
import { Button } from 'react-native-paper'

export default function Home({navigation}) {
  const[news, setNews] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HackerNews</Text>
      <ScrollView>

      <FlatList  
      
      />
      </ScrollView>
      <Button
    style={styles.button}
     mode="contained" onPress={() => navigation.navigate('Login')}
    >
      Log-out
    </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,    
  },
  title:{
    fontSize: 20,
  },
  button:{
    marginBottom: 20,

  }
})