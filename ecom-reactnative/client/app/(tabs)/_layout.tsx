import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs screenOptions={{headerShown:false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: 56 + Math.max(insets.bottom, 16),
          paddingBottom: Math.max(insets.bottom, 12),
          paddingTop: 12,
        }
    }}>
      <Tabs.Screen 
        name='index' 
        options={{ 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} />
          ) 
        }} 
      />

      <Tabs.Screen 
        name='cart' 
        options={{ 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={26} color={color} />
          ) 
        }} 
      />

      <Tabs.Screen 
        name='favorites' 
        options={{ 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={26} color={color} />
          ) 
        }} 
      />

      <Tabs.Screen 
        name='profile' 
        options={{ 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={26} color={color} />
          ) 
        }} 
      />
    </Tabs>
  )
}