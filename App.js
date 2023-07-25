import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '🏠 Поиск по Star Wars' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Избранное' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
