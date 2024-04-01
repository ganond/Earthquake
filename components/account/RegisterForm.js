import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { size } from 'lodash';
import { useNavigation } from '@react-navigation/native';

import { validateEmail } from '../../utils/helpers';
import { registerUser } from '../../utils/actions';
import Loading from '../Loading';

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValues());
    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirm: ''
    });
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onChange = (value, type) => {
        setFormData({ ...formData, [type]: value });
    };

    const doRegisterUser = async () => {
        if (!validateData()) {
            return;
        }
    
        setLoading(true);
        const { email, password } = formData; // Extraer el email y la contraseña de formData
        const result = await registerUser(email, password); // Llamar a registerUser con email y password
        setLoading(false);
    
        if (!result.statusResponse) {
            setErrors({ ...errors, email: result.error });
            return;
        }
    
        navigation.navigate('accounts');
    };
    

    const validateData = () => {
        const { name, lastName, email, password, confirm } = formData;
        const errorsCopy = { ...errors };

        if (!name.trim()) {
            errorsCopy.name = 'Debes ingresar tu nombre';
        } else {
            errorsCopy.name = '';
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = 'Debes ingresar tu apellido';
        } else {
            errorsCopy.lastName = '';
        }

        if (!validateEmail(email)) {
            errorsCopy.email = 'Debes ingresar un email válido';
        } else {
            errorsCopy.email = '';
        }

        if (password.length < 6) {
            errorsCopy.password = 'La contraseña debe tener al menos 6 caracteres';
        } else {
            errorsCopy.password = '';
        }

        if (confirm !== password) {
            errorsCopy.confirm = 'Las contraseñas no coinciden';
        } else {
            errorsCopy.confirm = '';
        }

        setErrors(errorsCopy);

        return Object.values(errorsCopy).every(error => !error);
    };

    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Nombre"
                onChangeText={value => onChange(value, 'name')}
                errorMessage={errors.name}
                defaultValue={formData.name}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Apellido"
                onChangeText={value => onChange(value, 'lastName')}
                errorMessage={errors.lastName}
                defaultValue={formData.lastName}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Correo electrónico"
                onChangeText={value => onChange(value, 'email')}
                keyboardType="email-address"
                errorMessage={errors.email}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Contraseña"
                onChangeText={value => onChange(value, 'password')}
                secureTextEntry={!showPassword}
                errorMessage={errors.password}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirmar contraseña"
                onChangeText={value => onChange(value, 'confirm')}
                secureTextEntry={!showPassword}
                errorMessage={errors.confirm}
                defaultValue={formData.confirm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Registrar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={doRegisterUser}
            />
            <Loading isVisible={loading} text="Creando cuenta..." />
        </View>
    );
}

const defaultFormValues = () => {
    return { name: '', lastName: '', email: '', password: '', confirm: '' };
};

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    input: {
        marginBottom: 15,
    },
    btnContainer: {
        marginTop: 20,
        width: '100%',
    },
    btn: {
        backgroundColor: '#00b8ff',
    },
});
