# Práctica Firebase — React Native (Expo)

Aplicación móvil desarrollada con **React Native + Expo** que consume **Firebase** (Firestore para datos y Authentication para inicio de sesión), como práctica complementaria del curso.

## Funcionalidades

- **CRUD de productos** en tiempo real con Cloud Firestore (`onSnapshot`).
- **Autenticación de usuarios** con Firebase Authentication (correo y contraseña), con sesión persistente entre cierres de la app.
- **Navegación condicionada por sesión**: si no hay usuario autenticado se muestra el stack de Login/Registro; si lo hay, se muestra el stack de la app.
- **Lógica separada en custom hooks**: cada screen consume un hook (`useHome`, `useAdd`, `useAuth`) en lugar de tener `useState`/`useEffect`/llamadas a Firebase directamente en el componente.
- **Splash screen e icono personalizados**.

## Estructura del proyecto

```
src/
├── components/
│   └── CardProductos.js       # Tarjeta de producto reutilizable
├── config/
│   └── firebase.js            # Inicialización de Firebase (App, Firestore, Auth)
├── hooks/
│   ├── useAuth.jsx            # Lógica de login, registro, logout y estado de sesión
│   ├── useAdd.jsx             # Lógica del formulario de agregar producto
│   └── useHome.jsx            # Lógica de listado en tiempo real de productos
├── navigation/
│   └── Navigation.js          # Stack de navegación (Auth stack / App stack)
└── screens/
    ├── Login.js                # Pantalla de inicio de sesión
    ├── Register.js             # Pantalla de registro
    ├── Home.js                 # Listado de productos
    └── Add.js                  # Formulario para agregar producto
```

## Requisitos previos

- Node.js LTS
- Expo CLI (`npx expo`)
- Un proyecto de Firebase con **Firestore** y **Authentication** (proveedor Correo/contraseña) habilitados

## Variables de entorno

Este proyecto usa `react-native-dotenv` para leer la configuración de Firebase desde variables de entorno. Crea un archivo `.env` en la raíz con:

```
API_KEY=tu_api_key
AUTH_DOMAIN=tu_auth_domain
PROJECT_ID=tu_project_id
STORAGE_BUCKET=tu_storage_bucket
MESSAGING_SENDER_ID=tu_messaging_sender_id
APP_ID=tu_app_id
```

Estos valores se obtienen desde **Configuración del proyecto > Tus apps > Configuración del SDK** en la consola de Firebase.

> El `.env` está incluido en `.gitignore` y no se sube al repositorio.

## Instalación de dependencias

Ejecuta los siguientes comandos uno por uno, en la raíz del proyecto (`firebase-app`), para instalar cada dependencia con la versión exacta usada en este proyecto.

```bash
npm install @react-navigation/native@^7.3.18
npm install @react-navigation/native-stack@^7.18.10
npm install babel-preset-expo@~54.0.10
npm install expo-constants@~18.0.14
npm install firebase@^12.18.0
npm install react-native-dotenv@^4.1.1
npm install react-native-gesture-handler@~2.28.0
npm install react-native-safe-area-context@~5.6.0
npm install react-native-screens@~4.16.0
npm install @react-native-async-storage/async-storage
```

### Alternativa recomendada (Expo)

Para paquetes nativos (Expo/React Native), es mejor usar `npx expo install` en lugar de `npm install`, ya que Expo se encarga de instalar la versión compatible con el SDK del proyecto:

```bash
npx expo install expo-constants
npx expo install expo-status-bar
npx expo install react-native-gesture-handler
npx expo install react-native-safe-area-context
npx expo install react-native-screens
npx expo install @react-native-async-storage/async-storage
```

Los paquetes que no son específicos de Expo pueden instalarse con `npm install` normalmente:

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install babel-preset-expo
npm install firebase
npm install react-native-dotenv
```

## Ejecutar el proyecto

```bash
npx expo start
```

Escanea el código QR con la app **Expo Go** (Android/iOS) o presiona `a` / `i` para abrir en un emulador.

## Autenticación

El flujo de autenticación usa `initializeAuth` con persistencia en `AsyncStorage`, de modo que la sesión del usuario se mantiene aunque cierre la app. Toda la lógica vive en `useAuth.jsx`:

- `login(email, password)` — inicia sesión con `signInWithEmailAndPassword`.
- `register(email, password)` — crea una cuenta con `createUserWithEmailAndPassword`.
- `logout()` — cierra la sesión con `signOut`.
- `user` / `loadingAuth` — estado de sesión consumido por `Navigation.js` para decidir qué stack mostrar.
