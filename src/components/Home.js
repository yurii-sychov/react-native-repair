import { rosybrown } from 'color-name';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
	const [isLoading, setLoading] = useState(true);

	const [total, setTotal] = useState(0);

	const [data, setData] = useState([]);

	const [dataSearch, setDataSeacrh] = useState([]);

	const [searchText, setValue] = useState('');

	const searchHandler = (searchText) => {
		setValue(searchText);
		getDataSearch(searchText);
	};

	const getData = async () => {
		try {
			const response = await fetch('http://repair.pp.ua/api/specific_renovation_objects/index/81809f82e2074b59448635de2fcc121aaec62890');
			const json = await response.json();
			setData(json.data);
			setDataSeacrh(json.data);
			setTotal(json.total);
		} catch (error) {
			return console.log('error', error);
		} finally {
			setLoading(false);
		}
	};

	const getDataSearch = async (searchText) => {
		try {
			const response = await fetch('http://repair.pp.ua/api/specific_renovation_objects/search/81809f82e2074b59448635de2fcc121aaec62890/' + searchText);
			const json = await response.json();
			setData(json.data);
			setTotal(json.total);
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
			<View style={styles.containerForm}>
				<TextInput style={styles.textInput} onChangeText={searchHandler} value={searchText} placeholder="Пошук за диспетчерським найменуванням..." />
				{data && !isLoading ? <Text style={styles.total}>Знайдено {total} строк</Text> : null}
			</View>
			{isLoading ? (
				<ActivityIndicator color="#000080" style={styles.spinner} />
			) : (
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<View style={styles.card}>
							<TouchableOpacity onPress={() => navigation.navigate('Passport', { id: item.id })}>
								<Text style={styles.textObject}>{item.complete_renovation_object}</Text>
								<View>
									<Text style={styles.textEquipment}>{item.equipment + ' ' + item.voltage / 1000 + ' кВ'}</Text>
									<Text style={styles.textDisp}>{item.name}</Text>
								</View>
							</TouchableOpacity>
						</View>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerForm: {
		paddingHorizontal: 20,
	},
	card: {
		// marginVertical: 10,
		marginBottom: 15,
		alignItems: 'flex-start',
		borderColor: '#C0C0C0',
		borderWidth: 2,
		marginHorizontal: 20,
		paddingVertical: 10,
		paddingLeft: 10,
		backgroundColor: '#00FF7F',
		borderRadius: 5,
		opacity: 100,
	},
	textInput: {
		borderBottomWidth: 2,
		borderBottomColor: '#3949ac',
		padding: 10,
		borderStyle: 'solid',
	},
	textObject: {
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 18,
	},
	textEquipment: {
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 14,
	},
	textDisp: {
		fontStyle: 'normal',
		fontWeight: '100',
		fontSize: 14,
	},
	total: {
		marginVertical: 10,
		fontSize: 14,
		fontWeight: 'bold',
	},
	spinner: {
		flex: 1,
	},
});
