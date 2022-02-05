import { StyleSheet, View, Text } from 'react-native';

export default function Navbar() {
	return (
		<View style={styles.main}>
			<Text style={styles.text}>Posts</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		height: 70,
		backgroundColor: '#3949ab',
		justifyContent: 'flex-end',
		paddingBottom: 10,
	},
	text: {
		fontSize: 18,
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
