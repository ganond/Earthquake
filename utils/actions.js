
import {appFirebase} from './firebase'

import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

import { initializeApp } from 'firebase/app'

const auth = getAuth(appFirebase)

export const isUserLogged = async () => {
    let isLogged = false;
    await firebase.auth().onAuthStateChanged((user) => {
        if(user !== null) { 
            isLogged = true;
        }
    });
    return isLogged;
};

export const getCurrentUser = () => {
    return auth.currentUser
}

export const closeSession = () => {
    return auth.signOut()
}

export const registerUser = async(email, password) => {
    const result = { statusResponse: true, error: null}
    try {
         await createUserWithEmailAndPassword(auth,email,password)
    } catch (error) {
        
        result.statusResponse = false
        result.error = "Este correo ya ha sido registrado."
    }
    return result
}

export const loginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await signInWithEmailAndPassword(auth,email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no válidos."
    }
    return result
}

