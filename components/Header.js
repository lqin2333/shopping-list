import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.headerWrapper}>
                <Text style={styles.h1}>{this.props.title} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        color: '#000',
        fontSize: 16,
        paddingTop:5,
        paddingBottom:5,
    },

});
