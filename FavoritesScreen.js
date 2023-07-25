import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from './Item';

function FavoritesScreen() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    async function fetchFavorites() {
        try {
            const value = await AsyncStorage.getItem('favorites');
            if (value !== null) {
                setFavorites(JSON.parse(value));
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function clearFavorites() {
        try {
            await AsyncStorage.removeItem('favorites');
            setFavorites([]);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Очистить избранное" onPress={clearFavorites} />
            <FlatList
                data={favorites}
                renderItem={({ item }) => <Item item={item} isFavoriteScreen />}
                keyExtractor={item => item.url}
            />
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
});

export default FavoritesScreen;
