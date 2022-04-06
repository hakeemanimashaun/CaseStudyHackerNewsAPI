import React from "react";
import {StyleSheet,View,Text,TouchableOpacity,Image} from "react-native"
import { Linking } from "react-native";


export const NewsDisplayComponent =({heading,url,author,points}) =>{
    return(
            
            <TouchableOpacity onPress={async()=>{
                await Linking.openURL(url)
            }}
            style={styles.container}>
                <Text style={styles.headingText}>{heading}</Text>
                <View style={styles.cardItemBottom}>
                    <Text style ={styles.bodyText}>Author: {author}</Text>
                    <Text style ={styles.bodyText}>Points: {points}</Text>
                </View>
            </TouchableOpacity>
            
    );
}

const styles = StyleSheet.create({
    container:{
        padding:25,
        margin:10,
        borderRadius:5,
        backgroundColor:"#fafafa",
        shadowColor:"#000",
        shadowOffset:{
            height: 7,
            width:0 
        },
        shadowOpacity:0.41,
        shadowRadius: 9.11,
        elevation:14,
    },
    headingText:{
     fontWeight:'bold',
     marginBottom:4,
     textTransform: "uppercase",
     fontSize:20,
    },
    bodyText:{
        marginBottom:4,
        fontSize:12,
       },
       cardItemBottom:{
           flexDirection:"row",
           justifyContent: "space-between" 
       }
})