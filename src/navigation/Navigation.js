import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import Home from '../screens/Home';
import Add from '../screens/Add';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { useAuth } from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { user, loadingAuth } = useAuth();

    // Mientras Firebase resuelve si hay una sesión guardada
    if (loadingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0288d1" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    // Stack de la app: usuario autenticado
                    <>
                        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
                        <Stack.Screen name="Add" component={Add}
                            options={{ presentation: 'modal', title: 'Agregar productos' }} />
                    </>
                ) : (
                    // Stack de autenticación: sin sesión
                    <>
                        <Stack.Screen name="Login" component={Login} options={{ title: 'Iniciar sesión' }} />
                        <Stack.Screen name="Register" component={Register} options={{ title: 'Crear cuenta' }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;