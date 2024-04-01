
/*
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EarthquakeMapScreen from './screens/EarthquakeMapScreen';
import DetailsScreen from './screens/DetailsScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={EarthquakeMapScreen} />
        <Stack.Screen name="Results" component={DetailsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
*/

import React from 'react'
import Navigation from './navigations/Navigation'

export default function App() {
  return (
    <Navigation/>
  );
}
