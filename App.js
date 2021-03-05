import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import newStore from './redux-setup/store/';
import Header from './components/Header';
import Container from './components/Container';

export default function App() {  
  return (
    <Provider store={newStore}>            
    <SafeAreaView style={styles.container}>        
      <Header/>
      <Container/>
    </SafeAreaView>    
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',    
    paddingTop:40
  },
});
