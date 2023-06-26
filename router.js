import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationForm from './Screens/auth/RegistrationScreen';
import LoginForm from './Screens/auth/LoginScreen';
import Home from './Screens/auth/Home';
import CommentsScreen from "./Screens/auth/CommentsScreen"
import MapScreen from './Screens/auth/MapScreen'

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
    if (!isAuth) {
      return (
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationForm}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginForm}
          />
          <AuthStack.Screen 
          name="CommentsScreen" 
          component={CommentsScreen}
          />
          <AuthStack.Screen 
          name="MapScreen" 
          component={MapScreen} 
          />
        </AuthStack.Navigator>
      );
    }
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <AuthStack.Screen 
        name="CommentsScreen" 
        component={CommentsScreen} 
        />
        <AuthStack.Screen 
        name="MapScreen" 
        component={MapScreen} 
        />
      </AuthStack.Navigator>
    );
};
  
  