import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  // For Icons

// Importing the screens
import Home from './src/Home';
import GymTime from './src/GymTime';
import Location from './src/Location';
import Profile from './src/Profile';

// Create a Tab navigator
 const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            // Set the icon based on the route name
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'GymTime') {
              iconName = 'barbell';  // Dumbbell icon
            } else if (route.name === 'Location') {
              iconName = 'location-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
             }

            // Return the Ionicon component with the correct icon
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="GymTime" component={GymTime} />
        <Tab.Screen name="Location" component={Location} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
