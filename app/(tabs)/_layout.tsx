import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs, useFocusEffect, useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppSelector } from '../shared/hooks';


export default function TabLayout() {
  const isAuth = useAppSelector(state=>state.auth.isAuth);
  const router = useRouter();

  // useFocusEffect(() => {
  //   if(!isAuth){
  //      router.replace('/(modals)/login')
  //     } else if (isAuth){
  //       router.replace('/')
  //     }
  // }, [isAuth]);

  useFocusEffect(
    React.useCallback(() => {
      if(!isAuth){
        router.replace('/(modals)/login')
       } else if (isAuth){
         router.replace('/')
       }
    }, [isAuth])
  );


  return (
    <Tabs screenOptions={{
      tabBarLabelStyle: {
        fontFamily: 'mon-b'
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Задания', 
          tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Отклики',
          tabBarIcon: ({ color }) => <FontAwesome6 name="list-check" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
