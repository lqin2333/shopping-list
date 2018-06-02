import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import { ImagePicker } from 'expo;'
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCC35I7egE-e-1KGQES8SiUwYvx5uIk4QU",
    authDomain: "shopping-list-fe82d.firebaseapp.com",
    databaseURL: "https://shopping-list-fe82d.firebaseio.com",
    projectId: "shopping-list-fe82d",
    storageBucket: "shopping-list-fe82d.appspot.com",
    messagingSenderId: "154853959968"
};
export default class Uploader extends React.Component {
    static navigationOptions = {
        header: null,
    }





    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    onChooseImagePress = async () => {
        let result = await ImagePicker.launchCameraAsync();

        if (!result.cancelled) {
            this.uploadImage(result.uri, "test-image")
                .then(() => {
                    Alert.alert("Success");
                })
                .catch((error) => {
                    Alert.alert(error);
                })
        }
    }

    uploadImage = (uri, imageName) => {
        const response = await response.blob();
        const blob = await response.blob();

        var ref = firebase.storage().ref().child("images/" + imageName);

        return ref.put(blob);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Choose Image"
                    onPress={this.onChooseImagePress} />
            </View>
        );
    }
}
