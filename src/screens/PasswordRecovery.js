import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PasswordRecovery() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>recuperação de senha</Text>
            <Text style={styles.subtitle}>
                você irá receber um e-mail ou SMS com informações para modificação da senha.
            </Text>

            <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.icon} />
                    <TextInput
                        placeholder="email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Ionicons name="call-outline" size={20} color="#aaa" style={styles.icon} />
                    <TextInput
                        placeholder="telefone"
                        placeholderTextColor="#999"
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                        keyboardType="phone-pad"
                    />
                </View>

                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendText}>enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 100,
        backgroundColor: '#B5B6FF',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 13,
        color: '#f1f1f1',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#ffffff22',
        padding: 20,
        borderRadius: 25,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 45,
        color: '#333',
    },
    sendButton: {
        backgroundColor: '#3d3d3d',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
