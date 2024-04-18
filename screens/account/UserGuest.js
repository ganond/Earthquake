import React from 'react'
import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/Temblor1.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.Mensaj}>¿Sabías que el planeta tierra tiene movimientos telúricos todos los días?</Text>
            <Text style={styles.Mensaj}>
              
            </Text>
            <Button
                buttonStyle={styles.button}
                title="Ver tu perfil"
                onPress={() => navigation.navigate("login")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "70%",
        marginBottom: 10,
        alignSelf: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center"
    }, 
    description: {
        textAlign: "justify",
        marginBottom: 20,
        color: "#a65273"
    },
    button: {
        backgroundColor: "#00b8ff"
    },
    
    Mensaj: {
        fontSize: 18, 
        textAlign: 'center', 
        marginHorizontal: 20, 
        marginTop: 20, 
        color: 'black', 
        fontWeight: 'bold', 
    }
})