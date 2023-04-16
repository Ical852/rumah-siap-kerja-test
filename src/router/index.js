import React from 'react'

import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
    ActivityPage,
    CertificatePage,
    DetailPage,
    HomePage,
    SplashPage,
    TransactionPage
} from '../pages';
import { BottomNavigator } from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabRouter = () => {
    return (
        <Tab.Navigator
            initialRouteName={'Beranda'}
            tabBar={props => <BottomNavigator {...props} />}
            screenOptions={{ 
                headerShown: false,
                tabBarHideOnKeyboard: true
            }}>
            <Tab.Screen name='Beranda' component={HomePage} />
            <Tab.Screen name='Transaksi' component={TransactionPage} />
            <Tab.Screen name='Aktivitas' component={ActivityPage} />
            <Tab.Screen name='Sertifikat' component={CertificatePage} />
        </Tab.Navigator>
    );
}

const Router = () => {
  return (
    <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={SplashPage} />
        <Stack.Screen name='Detail' component={DetailPage} />
        <Stack.Screen name='MainPage' component={TabRouter} />
    </Stack.Navigator>
  );
}

export default Router

const styles = StyleSheet.create({})