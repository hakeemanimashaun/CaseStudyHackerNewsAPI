import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native'
import React from 'react'
import { Card, Title, Paragraph, Button,List } from 'react-native-paper'

export default function AboutMe({navigation}) {
  
    const linkedinPressHandler = () => Linking.openURL("https://www.linkedin.com/in/hakeem-animashaun-b1600715a")

    const githubPressHandler = () => Linking.openURL("https://github.com/hakeemanimashaun?tab=repositories")

  return (
    <ScrollView>
    <View style={styles.container}>
      <Card style={styles.card} elevation={1}>
    <Card.Title title="Personal Information" />
    <Card.Cover source={require("../../../assets/hakeem.png")} />
    <Card.Content>
      <Title style={styles.title}>Hakeem Idrees Animashaun</Title>
      <Paragraph style={styles.text}>
        I am an adaptable, self motivated leader with 2 years experience in mobile applications development.
         I employ Standard practices for code structuring and application architecture hence I deliver high 
         quality code that can be managed over a long period. 
         I am no stranger to agile methodologies and have been involved in the app production process from planning till deployment. I am proficient with Android studio for native apps and React native for cross platform production.
    </Paragraph>

    <List.Section title="Technical Skills" titleStyle={{fontWeight: 'bold', fontSize: 20,}}>
    <List.Subheader>Some of my Technical skills include:</List.Subheader>
        <List.Item title="Android Native: Kotlin" />
        <List.Item title="React Native: Javascript, JSX, CSS" />
        <List.Item title="Redux and Hooks for state management" />
        <List.Item title="Agile methodologies: Scrum" />
        <List.Item title="Testing: jest, Expresso, J-unit" />
        <List.Item title="Network management: Retrofit, axios" />
        <List.Item title="Code versioning with Git and Github" />
        <List.Item title="Collaboration tool: Jira, trello" />
    </List.Section>
      <Button onPress={githubPressHandler} style={styles.visitButton}>Visit My Github</Button>
      <Button onPress={linkedinPressHandler} style={styles.visitButton}>Visit My Linkedin</Button>
    </Card.Content>
    <Card.Actions>
      <Button onPress={()=> navigation.navigate('HomePage')} style={styles.button}>back to home</Button>
    </Card.Actions>
  </Card>
    </View>
    </ScrollView>
  )
}

const styles =StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    padding: 10,

  },
  title:{
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  text:{
    textAlign: 'justify',
    marginVertical: 10,
    
  }, 
  button:{
    backgroundColor: '#000',
    margin: 10,
    marginLeft: '32%',
    marginBottom: 15,
  }, 
  visitButton:{

  }, 
  card:{
    alignItems: 'center'
  }
})