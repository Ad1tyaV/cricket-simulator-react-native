import React from 'react';
import { StyleSheet, Text, SafeAreaView,StatusBar } from 'react-native';


export default function Header() {
  return (
    <SafeAreaView>
    <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "darkslateblue" translucent = {true}/>    
    <Text style={styles.text}>Book Cricket Simulator!</Text>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  header:{      
      height:60,
      padding:15,
      backgroundColor:'darkslateblue',
      color:'white',
      justifyContent:'center',      
  },
  text:{
      color:'#FFF',
      fontSize:18,
      textAlign:'center',
      backgroundColor:'darkslateblue',
      height:50,
      padding:10
  }
});
