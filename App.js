// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CoverPage from './coverPage';
import HomePage from './HomePage';
import DetailsPage from './DetailsPage';
import FavoritesPage from './FavoritesPage';
import AboutPage from './AboutPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff5733',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Favorites" component={FavoritesPage} />
      <Tab.Screen name="About" component={AboutPage} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cover">
        {/* Cover Page */}
        <Stack.Screen
          name="Cover"
          component={CoverPage}
          options={{ headerShown: false }} // Hide header for the cover page
        />

        {/* Main Tabs (Home, Favorites, About) */}
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }} // Hide header for the main tabs
        />

        {/* Details Page */}
        <Stack.Screen
          name="Details"
          component={DetailsPage}
          options={{ title: 'Site Details' }} // Optional: Set a title for the Details screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}