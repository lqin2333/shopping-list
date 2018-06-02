import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import { Camera, Permissions, ImagePicker } from 'expo';
import * as firebase from 'firebase';
import * as ShoppingAPI from '../utils/ShoppingAPI';
import firebaseKey from '../utils/firebaseKey';


export default class EditItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "id": this.props.navigation.getParam('id', 'NO ID'),
            "name": this.props.navigation.getParam('name', 'No Name'),
            "quantity": this.props.navigation.getParam('quantity', 0).toString(),
            "des": this.props.navigation.getParam('des', '...'),
            "image": this.props.navigation.getParam('image', '...'),
            "imageName": Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10),
        }

        //--- firebase config ---
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseKey.config);
        }
    }

    onTakePhotoPress = async () => {
        const _this = this;
        let result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
            this.uploadImage(result.uri, this.state.imageName)
                .then(() => {
                    this.getImageUrl(this.state.imageName)
                        .then(function (url) {
                            _this.setState({ "image": url, });
                            alert('Image uploaded');

                        }).catch(function (error) {
                            alert(JSON.stringify(error));
                        });
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
                })
        }
    }

    onPickPhotoPress = async () => {
        const _this = this;
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            this.uploadImage(result.uri, this.state.imageName)
                .then(() => {
                    this.getImageUrl(this.state.imageName)
                        .then(function (url) {
                            _this.setState({ "image": url, });
                            alert('Image uploaded');

                        }).catch(function (error) {
                            alert(JSON.stringify(error));
                        });
                })
                .catch((error) => {
                    alert('error_111');
                });
        }
    }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child(`images/${imageName}`);
        return ref.put(blob);
    }

    getImageUrl = async (imageName) => {
        return firebase.storage().ref().child(`images/${imageName}`).getDownloadURL();
    }

    static navigationOptions = {
        title: 'Edit Item',
    };

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    //update the item
    editItem(id, body) {
        const _this = this;
        ShoppingAPI.updateItem(id, body).then(
            response => {
                alert('Item Has Been Updated');
                //_this.props.navigation.navigate('ShoppingList');
                this.props.navigation.state.params.refresh();
                this.props.navigation.goBack();
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Please provide camera permission</Text>;
        } else {
            return (
                <View style={styles.itemWrapper}>
                    <ScrollView>
                        {/* Name */}
                        <Text style={styles.itemTextInputTitle}>Name</Text>
                        <TextInput
                            style={styles.itemTextInput}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                        />

                        {/* Quantity */}
                        <Text style={styles.itemTextInputTitle}>Quantity</Text>
                        <TextInput
                            style={styles.itemTextInput}
                            keyboardType='numeric'
                            onChangeText={(quantity) => this.setState({ quantity })}
                            value={this.state.quantity}
                        />

                        {/* Description */}
                        <Text style={styles.itemTextInputTitle}>Description</Text>
                        <TextInput
                            style={styles.itemTextInputMultiline}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(des) => this.setState({ des })}
                            value={this.state.des}
                        />

                        {/* image */}
                        <View style={styles.imageWrapper}>
                            <Text style={styles.itemTextInputTitle}>Image</Text>
                            <Text style={styles.imageInputTitle}>URL</Text>
                            <TextInput
                                style={styles.itemTextInput}
                                onChangeText={(image) => this.setState({ image })}
                                value={this.state.image}
                            />
                            <Text style={styles.imageInputTitle}>or</Text>
                            <View style={styles.photoOptionsWrapper}>
                                <Icon size={50} name='image' onPress={this.onPickPhotoPress} />
                                <Icon size={50} name='photo-camera' onPress={this.onTakePhotoPress} />
                            </View>
                        </View>

                        {/* Update Button */}
                        <View style={styles.buttonWrapper} >
                            <Button title='Update'
                                buttonStyle={{
                                    backgroundColor: "#3c8ffc",
                                    width: 100,
                                    height: 45,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 5
                                }}

                                onPress={
                                    this.editItem.bind(this, this.state.id, {
                                        "name": this.state.name,
                                        "quantity": parseInt(this.state.quantity),
                                        "des": this.state.des,
                                        "image": this.state.image,
                                    })
                                }
                            />
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    itemWrapper: {
        height: 800,
    },
    itemTextInputTitle: {
        paddingLeft: 10,
    },
    itemTextInput: {
        height: 40,
        padding: 10,
        borderWidth: 2,
        borderColor: '#aaaaaa',
        margin: 10,
    },
    itemTextInputMultiline: {
        height: 100,
        padding: 10,
        borderWidth: 2,
        borderColor: '#aaaaaa',
        margin: 10,
    },
    buttonWrapper: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 20,
    },
    imageWrapper: {
        borderWidth: 2,
        borderColor: '#aaaaaa',
        borderStyle: 'dotted',
        marginLeft: 10,
        marginRight: 10,
    },
    photoOptionsWrapper: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    imageInputTitle: {
        marginLeft: 10,
    },
});