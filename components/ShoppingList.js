import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingItem from './ShoppingItem';

export default class ShoppingList extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>My Shopping List</Text>
                <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
                <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
                <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    h1:{
        color: '#000',
        fontSize:20,
        textAlign: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
    },
});
