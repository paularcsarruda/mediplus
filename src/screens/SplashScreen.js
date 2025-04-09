import React, { useEffect, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Animated, 
    Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const navigation = useNavigation();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('Login'); // 👈 nome da rota, igual ao que está no App.js
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.iconContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Image source={require('../img/logo.png')} style={styles.logo} />
                <Text style={styles.text}>Medi+</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8793FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 400,
        height: 280,
        resizeMode: 'contain',
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 36,
        marginTop: 20,
        letterSpacing: 1,
    },
});
