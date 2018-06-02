import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import { Camera, Permissions, ImagePicker } from 'expo';
import * as firebase from 'firebase';
import * as ShoppingAPI from '../utils/ShoppingAPI';
import firebaseKey from '../utils/firebaseKey';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

export default class EditItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam('id', 'NO ID'),
            name: this.props.navigation.getParam('name', 'No Name'),
            quantity: this.props.navigation.getParam('quantity', 0).toString(),
            des: this.props.navigation.getParam('des', '...'),
            image: this.props.navigation.getParam('image', '...'),
            imageName: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10),
            uploading: false,
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
            this.setState({ uploading: true });
            this.uploadImage(result.uri, this.state.imageName)
                .then(() => {
                    this.getImageUrl(this.state.imageName)
                        .then(function (url) {
                            _this.setState({ "image": url, uploading: false });
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
            this.setState({ uploading: true });
            this.uploadImage(result.uri, this.state.imageName)
                .then(() => {
                    this.getImageUrl(this.state.imageName)
                        .then(function (url) {
                            _this.setState({ "image": url, uploading: false });
                            alert('Image uploaded');
                        }).catch(function (error) {
                            alert(JSON.stringify(error));
                        });
                })
                .catch((error) => {
                    alert(JSON.stringify(error));
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
            if (this.state.uploading) {
                return (
                    <View style={styles.uploadingIndicator}>
                        <ActivityIndicator visible={false} size="large" color="#3c8ffc" />
                        <Text>Image is uploading. Please wait...</Text>
                    </View>
                );
            }
            else {
                return (
                    <View style={styles.itemWrapper}>
                        <KeyboardAwareScrollView>
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
                            <Text style={styles.itemTextInputTitle}>Image</Text>
                            <View style={styles.imageBlockWrapper}>
                                <View style={styles.imageWrapper}>
                                    <Image source={{ uri: this.state.image }} style={styles.itemImage} />
                                </View>
                                <View style={styles.imageData}>
                                    <Text style={styles.imageInputTitle}>Use URL</Text>
                                    <TextInput
                                        style={styles.itemTextInput}
                                        onChangeText={(image) => this.setState({ image })}
                                        value={this.state.image}
                                    />
                                    <Text style={styles.imageInputTitle}>OR Pick/Take a photo </Text>
                                    <View style={styles.photoOptionsWrapper}>
                                        <Icon size={40} color='#fc8171' name='image' onPress={this.onPickPhotoPress} />
                                        <Icon size={40} color='#67aafc' name='photo-camera' onPress={this.onTakePhotoPress} />
                                    </View>
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
                        </KeyboardAwareScrollView>
                    </View >
                );
            }
        }
    }
}

const styles = StyleSheet.create({
    uploadingIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemWrapper: {

    },
    itemTextInputTitle: {
        paddingLeft: 10,
    },
    itemTextInput: {
        flex: 2,
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
    imageBlockWrapper: {
        borderWidth: 2,
        borderColor: '#aaaaaa',
        margin: 10,
        flexDirection: "row",
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImage: {
        height: 70,
        width: 70,
        backgroundColor: '#f7f7f7',
    },
    imageData: {
        flex: 3
    },
    photoOptionsWrapper: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    imageInputTitle: {
        marginLeft: 10,
    },
});