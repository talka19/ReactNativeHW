import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationForm from './Screens/auth/RegistrationsScreen';
// import LoginForm from './Screens/LoginScreen';


const RegistrationsNavigator = () => {
    const RegistrationsStack = createStackNavigator()
    return (
        <RegistrationsStack.Navigator>
            <RegistrationsStack.Screen 
            name="Registration"
            component={RegistrationForm}>
            </RegistrationsStack.Screen>
            {/* <RegistrationsStack.Screen 
            name={LOGIN}
            component={LoginForm}>
            </RegistrationsStack.Screen> */}
        </RegistrationsStack.Navigator>
    );
};

export default RegistrationsNavigator;