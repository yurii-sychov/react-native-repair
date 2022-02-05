import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Image, Button } from 'react-native';

export default function Passport({ navigation, route }) {
	const [isLoading, setLoading] = useState(true);

	const { id, type } = route.params;

	const [data, setData] = useState({});

	const getData = async () => {
		try {
			const response = await fetch('http://repair.pp.ua/api/specific_renovation_objects/index/81809f82e2074b59448635de2fcc121aaec62890/' + id);
			const json = await response.json();
			setData(json.data);
		} catch (error) {
			return console.log('error', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<View style={styles.container}>
			<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
			{isLoading ? (
				<ActivityIndicator color="#000080" style={styles.spinner} />
			) : (
				<View style={styles.card}>
					<Text style={styles.textName}>{data.complete_renovation_object + ' ' + data.equipment + ' ' + data.name}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		marginVertical: 10,
		alignItems: 'center',
	},
	textName: {
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 18,
	},
	textEmail: {},
	spinner: {
		flex: 1,
	},
});
