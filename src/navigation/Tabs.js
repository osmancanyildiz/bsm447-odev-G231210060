import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from '../screens/ListScreen';
import SavedScreen from '../screens/SavedScreen';

const Tab = createBottomTabNavigator();

// Sekme simgesi olarak emoji kullanıyoruz (ek paket gerekmez)
const icon = (emoji) => ({ focused }) => (
  <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
);

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1F3A93' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#1F3A93',
      }}
    >
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{ title: 'Ravenclaw', tabBarLabel: 'Karakterler', tabBarIcon: icon('🦅') }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{ title: 'Kaydedilenler', tabBarIcon: icon('⭐') }}
      />
    </Tab.Navigator>
  );
}
