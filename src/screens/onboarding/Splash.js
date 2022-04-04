import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'


export default function Splash({navigation}) {
  return (
    <View style={styles.container}>
      <LottieView 
      source={require('../../../assets/lottieHackerNews.json')} 
      autoPlay 
      loop='false'
      speed={0.5}  
      onAnimationFinish={()=>navigation.navigate('Login')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ff00'
  }
})