import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegisterForm from '../../components/account/RegisterForm'

export default function Register() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/Temblor1.png")}
                resizeMode="contain"
                style={styles.profile}
            />
            <RegisterForm/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    
    profile:{
        width: 200,
        height:200,
        alignSelf: "center",
        borderRadius:50,
        borderColor: 'white'
    },
    
    image : {
        height: 150,
        width: "100%",
        marginBottom: 20
    }
})