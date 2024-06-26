import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screens/account/Account'
import Login from '../screens/account/Login'
import Register from '../screens/account/Register'
import EarthquakeMapScreen from '../screens/EarthquakeMapScreen'
import DetailsScreen from '../screens/DetailsScreen'




const Stack = createStackNavigator()

export default function AccountStack() {
    return (
        <Stack.Navigator>
            
        <Stack.Screen  
            name="accounts"
            component={Account}
            options={{ headerShown : false, title: "Cuenta" }}

           
        />            
        <Stack.Screen  
            name="login"
            component={Login}
            options={{ title: "Iniciar Sesion" }}           
        />           
        <Stack.Screen  
            name="register"
            component={Register}
            options={{ title: "Registrar Usuario" }}           
        />  
        <Stack.Screen
            name="earthquakemapscreen"
            component={EarthquakeMapScreen}
            options={{ title: "Buscar Terremotos" }}
        />
        
        <Stack.Screen
            name="Results"
            component={DetailsScreen}
            options={{ title: "Results" }}
        />


        </Stack.Navigator>
    )
}