import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import RegistrationForm from './Screens/RegistrationScreen';
// import LoginForm from './Screens/LoginScreen';


export default function App() {


  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('./assets/Images/PhotoBG.png')}>
        <RegistrationForm />
        {/* <LoginForm /> */}
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex:1,
    resizeMode: "cover",
  }
});


