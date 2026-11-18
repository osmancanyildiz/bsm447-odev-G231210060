import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SavedProvider } from './src/context/SavedContext';
import Tabs from './src/navigation/Tabs';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator();

// Yapı: Stack -> [Tabs (Liste, Kaydedilenler), Detay]
// Detay, sekmelerin üstünde açılır
export default function App() {
  return (
    <SavedProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#1F3A93' },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detay' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SavedProvider>
  );
}
