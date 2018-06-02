import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { Constants } from 'expo';

export default class KeyboardAvoid extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "blue" }}>

                <KeyboardAvoidingView behavior="height" style={{ backgroundColor: "green", paddingTop: 22, flex: 1, justifyContent: 'center' }}>
                    <ScrollView>
                        <View>
                            <TextInput style={{ height: 30, backgroundColor: "red" }} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});
