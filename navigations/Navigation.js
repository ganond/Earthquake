import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import AccountStack from './AccountStack';
import EarthquakeMapScreen from '../screens/EarthquakeMapScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para controlar el inicio de sesión

    const screenOptions = (route, color) => {
        let iconName;
        switch (route.name) {
            case "account":
                iconName = "home-outline";
                break;
        }

        return (
            <Icon
                type="material-community"
                name={iconName}
                size={22}
                color={color}
            />
        );
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                    tabBarActiveTintColor: "#00b8ff",
                    tabBarInactiveTintColor: "#7dc1c3",
                    tabBarStyle: {
                        display: "flex"
                    }
                })}
            >
               <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{ headerShown: false, title: "Cuenta" }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}
