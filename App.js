import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/components/Home';
import Passport from './src/components/Passport';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={Home} options={{ title: 'Головна' }} />
				<Stack.Screen name="Passport" component={Passport} options={({ route }) => ({ title: route.params.type })}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
