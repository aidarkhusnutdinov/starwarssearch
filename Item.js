import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
    },
    character: {
        backgroundColor: '#f9c2ff',
    },
    starship: {
        backgroundColor: '#c2f9ff',
    },
    planet: {
        backgroundColor: '#f9ffc2',
    },
    title: {
        fontSize: 24,
    },
});

function translateGender(gender) {
    switch (gender) {
        case 'male':
            return 'мужской';
        case 'female':
            return 'женский';
        default:
            return gender;
    }
}

function Item({ item, onAddToFavorites, isFavoriteScreen }) {
    // Персонажи Star Wars
    if (item.gender) {
        return (
            <View style={[styles.item, styles.character]}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>Пол: {translateGender(item.gender)}</Text>
                <Text>Количество звездолетов: {item.starships ? item.starships.length : 'N/A'}</Text>
                {!isFavoriteScreen && <Button title="Добавить в избранное" onPress={() => onAddToFavorites(item)} />}
            </View>
        );
    }
    // Звездолеты
    else if (item.model) {
        return (
            <View style={[styles.item, styles.starship]}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>Модель: {item.model}</Text>
                <Text>Производитель: {item.manufacturer}</Text>
                <Text>Пассажиры: {item.passengers}</Text>
                {!isFavoriteScreen && <Button title="Добавить в избранное" onPress={() => onAddToFavorites(item)} />}
            </View>
        );
    }
    // Планеты
    else if (item.diameter) {
        return (
            <View style={[styles.item, styles.planet]}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>Диаметр: {item.diameter}</Text>
                <Text>Население: {item.population}</Text>
                {!isFavoriteScreen && <Button title="Добавить в избранное" onPress={() => onAddToFavorites(item)} />}
            </View>
        );
    }
    return null;
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    onAddToFavorites: PropTypes.func,
    isFavoriteScreen: PropTypes.bool,
};

export default Item;
