import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import StyleScreen from '../screens/StyleScreen';
import MindsetScreen from '../screens/MindsetScreen';
import CocktailsScreen from '../screens/CocktailsScreen';
import CoachScreen from '../screens/CoachScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F0F0F',
          borderTopColor: '#1F1F1F',
          borderTopWidth: 1,
          paddingBottom: 4,
          height: 60,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: fonts.medium, letterSpacing: 0.5 },
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Workout: focused ? 'barbell' : 'barbell-outline',
            Style: focused ? 'shirt' : 'shirt-outline',
            Mindset: focused ? 'eye' : 'eye-outline',
            Cocktails: focused ? 'wine' : 'wine-outline',
          };
          return <Ionicons name={icons[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Style" component={StyleScreen} />
      <Tab.Screen name="Mindset" component={MindsetScreen} />
      <Tab.Screen name="Cocktails" component={CocktailsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: colors.gold,
          background: colors.background,
          card: colors.surface,
          text: colors.white,
          border: colors.cardBorder,
          notification: colors.gold,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeTabs} />
        <Stack.Screen
          name="Coach"
          component={CoachScreen}
          options={{
            headerShown: true,
            title: 'Bond Coach',
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.gold,
            headerTitleStyle: { color: colors.white, fontWeight: fonts.semibold },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
