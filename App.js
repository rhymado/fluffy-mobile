import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import Auth from './src/screens/Auth';

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        // screenOptions={} options global
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            // options local
            headerShown: false,
          }}
        />
        <Stack.Screen name="Auth" options={{headerTitle: 'Login'}}>
          {props => {
            // logika private route
            // if (token) return <Home />
            return <Auth {...props} />;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
