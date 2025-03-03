import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screen imports
import ScannerScreen from './src/screens/ScannerScreen';
import MenuScreen from './src/screens/MenuScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';

export type RootStackParamList = {
    Scanner: undefined;
    Menu: { restaurantId: string };
    ItemDetail: { itemId: string };
    Auth: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Scanner"
                        screenOptions={{
                            headerShown: true,
                            headerBackTitleVisible: false,
                            headerStyle: {
                                backgroundColor: '#fff',
                            },
                            headerTintColor: '#000',
                        }}
                    >
                        <Stack.Screen
                            name="Scanner"
                            component={ScannerScreen}
                            options={{
                                title: 'Scan Menu QR Code',
                            }}
                        />
                        <Stack.Screen
                            name="Menu"
                            component={MenuScreen}
                            options={{
                                title: 'Restaurant Menu',
                            }}
                        />
                        <Stack.Screen
                            name="ItemDetail"
                            component={ItemDetailScreen}
                            options={{
                                title: 'Item Details',
                            }}
                        />
                        <Stack.Screen
                            name="Auth"
                            component={AuthScreen}
                            options={{
                                title: 'Authentication',
                            }}
                        />
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                title: 'Home',
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
} 