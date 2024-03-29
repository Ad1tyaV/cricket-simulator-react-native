import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Container from './components/Container';

export default function App() {
  return (              
    <SafeAreaView style={styles.container}>            
      <Header/>      
      <Container/>
    </SafeAreaView>        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',    
    paddingTop:40
  },
});
