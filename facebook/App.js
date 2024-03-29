import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { publicRoutes } from './src/routes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import { Provider } from 'react-redux';
import store from './src/store/store.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

library.add(fab, faSquareCheck);

const Stack = createStackNavigator();

export default function App() {
    const [route, setRoute] = useState('Login');
    useEffect(() => {
        const getInfo = async () => {
            const info = await AsyncStorage.getItem('accountInfo');
            if (info) {
                setRoute('SaveAccountLogin');
            }
        };

        getInfo();
    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SaveAccountLogin" screenOptions={{ headerShown: false }}>
                    {publicRoutes.map((route, index) => (
                        <Stack.Screen key={index} name={route.name} component={route.component} />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
