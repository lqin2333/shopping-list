import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class ShoppingItem extends React.Component {
    render() {
        return (
            <View style={styles.singleItem}>
                <Avatar
                    medium
                    source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg" }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    singleItem: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
