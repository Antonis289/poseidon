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
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TAB_ICONS = {
  Home: ['home', 'home-outline'],
  Workout: ['barbell', 'barbell-outline'],
  Style: ['shirt', 'shirt-outline'],
  Mindset: ['eye', 'eye-outline'],
  Cocktails: ['wine', 'wine-outline'],
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F0F0F',
          borderTopColor: '#1F1F1F',
          borderTopWidth: 1,
          paddingBottom: 6,
          paddingTop: 4,
          height: 64,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: fonts.medium, letterSpacing: 0.5 },
        tabBarIcon: ({ color, focused }) => {
          const [active, inactive] = TAB_ICONS[route.name];
          return <Ionicons name={focused ? active : inactive} size={22} color={color} />;
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
        <Stack.Screen name="Coach" component={CoachScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
