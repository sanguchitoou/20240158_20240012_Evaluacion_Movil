import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { auth } from '../config/firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

// Hook que centraliza toda la lógica de autenticación
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true); // true mientras Firebase resuelve la sesión inicial

    useEffect(() => {
        // Se dispara al iniciar la app y cada vez que cambia el estado de sesión
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoadingAuth(false);
        });

        return () => unsubscribe();
    }, []);

    // Inicia sesión con correo y contraseña
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            Alert.alert('Error', 'Correo o contraseña incorrectos.');
        }
    };

    // Registra un nuevo usuario
    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error al registrar', error);
            Alert.alert('Error', 'No se pudo crear la cuenta. Verifica el correo y que la contraseña tenga al menos 6 caracteres.');
        }
    };

    // Cierra la sesión actual
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error al cerrar sesión', error);
            Alert.alert('Error', 'No se pudo cerrar sesión.');
        }
    };

    return { user, loadingAuth, login, register, logout };
};