import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import PasswordRecovery from './src/screens/PasswordRecovery';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // Oculta o header em todas as telas
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} /> {/* 👈 Registro da rota */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Recovery" component={PasswordRecovery} />
        <Stack.Screen name="Register" component={RegistrationScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
