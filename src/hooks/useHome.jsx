import { useState, useEffect } from 'react';
import { database } from '../config/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

// Hook que encapsula la suscripción en tiempo real a Firestore y la navegación
export const useHome = (navigation) => {
    // Estado local para almacenar los productos
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Define una consulta a la colección 'productos', ordenada por 'creado' descendente
        const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));

        // Escucha cambios en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setProductos(docs);
        });

        // Limpieza de la suscripción al desmontar
        return () => unsubscribe();
    }, []);

    // Navega a la pantalla de agregar producto
    const goToAdd = () => {
        navigation.navigate('Add');
    };

    return {
        productos,
        goToAdd,
    };
};