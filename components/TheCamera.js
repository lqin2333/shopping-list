import React from 'react';
import { Image, StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';
import * as firebase from 'firebase';

export default class TheCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  constructor(props) {
    super(props);

    alert(!firebase.apps.length);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCC35I7egE-e-1KGQES8SiUwYvx5uIk4QU",
        authDomain: "shopping-list-fe82d.firebaseapp.com",
        databaseURL: "https://shopping-list-fe82d.firebaseio.com",
        projectId: "shopping-list-fe82d",
        storageBucket: "shopping-list-fe82d.appspot.com",
        messagingSenderId: "154853959968"
      });
    }
  }

  onTakePhotoPress = async () => {
    let result = await ImagePicker.launchCameraAsync();

    alert(result.uri);


    if (!result.cancelled) {
      this.uploadImage(result.uri, "test-image")
        .then(() => {
          alert("Success");
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        })
    }
  }

  onPickPhotoPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    alert(result.uri);


    if (!result.cancelled) {
      this.uploadImage(result.uri, "test-image")
        .then(() => {
          alert("Success");
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        })
    }
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);

    return ref.put(blob);
  }

  static navigationOptions = {
    header: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (

        <View style={styles.container}>
          <Button title="Take Photo"
            onPress={this.onTakePhotoPress} />
          <Button title="Pick Photo"
            onPress={this.onPickPhotoPress} />
        </View>
        // <View style={{ flex: 1 }}>
        //   <Camera style={{ flex: 1 }} type={this.state.type}>
        //     <View
        //       style={{
        //         flex: 1,
        //         backgroundColor: 'transparent',
        //         flexDirection: 'row',
        //       }}>
        //       <TouchableOpacity
        //         style={{
        //           flex: 0.1,
        //           alignSelf: 'flex-end',
        //           alignItems: 'center',
        //         }}
        //         // onPress={() => {
        //         //   this.setState({
        //         //     type: this.state.type === Camera.Constants.Type.back
        //         //       ? Camera.Constants.Type.front
        //         //       : Camera.Constants.Type.back,
        //         //   });
        //         // }}
        //         onPress={() => {
        //           this.onChooseImagePress;
        //         }}



        //       >
        //         <Text
        //           style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
        //           {' '}Flip{' '}
        //         </Text>
        //       </TouchableOpacity>
        //     </View>
        //   </Camera>
        // </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});