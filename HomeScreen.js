import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Item from './Item';




export default function HomeScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    async function search() {
        setLoading(true);
        setError(null);
        try {
            const peopleResponse = await axios.get(`https://swapi.dev/api/people/?search=${query}`);
            const starshipsResponse = await axios.get(`https://swapi.dev/api/starships/?search=${query}`);
            const planetsResponse = await axios.get(`https://swapi.dev/api/planets/?search=${query}`);
            setData([...peopleResponse.data.results, ...starshipsResponse.data.results, ...planetsResponse.data.results]);
        } catch (error) {
            setError(error.toString());
        } finally {
            setLoading(false);
        }
    }
    

    async function addToFavorites(item) {
        try {
            const favorites = await AsyncStorage.getItem('favorites');
            if (favorites) {
                const favoritesArray = JSON.parse(favorites);
                if (!favoritesArray.some(favoriteItem => favoriteItem.url === item.url)) {
                    favoritesArray.push(item);
                    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
                }
            } else {
                await AsyncStorage.setItem('favorites', JSON.stringify([item]));
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Введите персонажа, звездолет или планету" onChangeText={text => setQuery(text)} />
            <Button title="Искать" onPress={search} />
            <Button title="Перейти к избранному" onPress={() => navigation.navigate('Favorites')} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text>Error: {error}</Text>
            ) : (
                <FlatList
    data={data}
    renderItem={({ item }) => <Item item={item} onAddToFavorites={addToFavorites} />}
    keyExtractor={item => item.url}
/>
            )}
        </View>
    );
    
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    title: {
        fontSize: 24,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});
