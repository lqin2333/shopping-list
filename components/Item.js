import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Header';

export default class Item extends React.Component {
    render() {
        return (
            <View style={styles.itemWrapper}>
                <Header title="Item" />
                <TextInput
                    style={styles.itemTextInput}
                    placeholder="Name"
                />
                <TextInput
                    style={styles.itemTextInput}
                    placeholder="Quantity"
                />
                <TextInput
                    style={styles.itemTextInput}
                    placeholder="Description"
                />
                <Text>Image</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemWrapper: {

    },
    itemTextInput: {
        height: 40,
    }


});
