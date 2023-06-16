// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createStackNavigator } from "@react-navigation/stack";

// import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import RegistrationForm from './Screens/RegistrationScreen';
import LoginForm from './Screens/LoginScreen';

const Stack = createNativeStackNavigator();
// const MainStack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Registration" component={RegistrationForm} />
        <Stack.Screen name="Login" component={LoginForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <View style={styles.container}>
  //     <ImageBackground style={styles.image} source={require('./assets/Images/PhotoBG.png')}>
  //       {/* <RegistrationForm /> */}
  //       <LoginForm />
  //       <StatusBar style="auto" />
  //     </ImageBackground>
  //   </View>
  // );
}

// const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   justifyContent: 'center',
  // },
  // image: {
  //   flex:1,
  //   resizeMode: "cover",
  //   justifyContent: 'flex-end',
  // }
// });


