import { useState } from 'react';
import { Alert } from 'react-native';
import { database } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Hook que encapsula toda la lógica del formulario de agregar producto
export const useAdd = (navigation) => {
    // Estado inicial del producto
    const [producto, setProducto] = useState({
        nombre: '',
        precio: 0,
        vendido: false,
        creado: new Date(),
    });

    // Función para navegar a la pantalla de inicio
    const goToHome = () => {
        navigation.goBack();
    };

    // Actualiza un campo específico del producto
    const updateField = (field, value) => {
        setProducto(prev => ({ ...prev, [field]: value }));
    };

    // Función para agregar el producto a Firestore
    const agregarProducto = async () => {
        try {
            await addDoc(collection(database, 'productos'), { ...producto });
            console.log('Se guardó la colección');

            Alert.alert('Producto agregado', 'El producto se agregó correctamente', [
                { text: 'Ok', onPress: goToHome },
            ]);
        } catch (error) {
            console.error('Error al agregar el producto', error);
            Alert.alert('Error', 'Ocurrió un error al agregar el producto. Por favor, intenta nuevamente.');
        }
    };

    return {
        producto,
        updateField,
        agregarProducto,
        goToHome,
    };
};