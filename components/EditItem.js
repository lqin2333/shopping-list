import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import * as ShoppingAPI from '../utils/ShoppingAPI';
const dismissKeyboard = require('dismissKeyboard'); 

export default class EditItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "id": this.props.navigation.getParam('id', 'NO ID'),
            "name": this.props.navigation.getParam('name', 'No Name'),
            "quantity": this.props.navigation.getParam('quantity', 0).toString(),
            "des": this.props.navigation.getParam('des', '...'),
        }
    }

    static navigationOptions = {
        title: 'Edit Item',
    };

    //update the item
    editItem(id, body) {
        ShoppingAPI.updateItem(id, body).then(
            response => {
                dismissKeyboard(); 
                alert('Item Has Been Updated');
                this.props.navigation.navigate('ShoppingList');
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    render() {
        return (
            <View style={styles.itemWrapper}>

                <Text style={styles.itemTextInputTitle}>Name</Text>
                <TextInput
                    style={styles.itemTextInput}
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                />

                <Text style={styles.itemTextInputTitle}>Quantity</Text>
                <TextInput
                    style={styles.itemTextInput}
                    keyboardType='numeric'
                    onChangeText={(quantity) => this.setState({ quantity })}
                    value={this.state.quantity}
                />

                <Text style={styles.itemTextInputTitle}>Description</Text>
                <TextInput
                    style={styles.itemTextInputMultiline}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(des) => this.setState({ des })}
                    value={this.state.des}
                />

                <Text style={styles.itemTextInputTitle}>Image</Text>
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
                                "image": "http://peterrabbit.nz/wp-content/uploads/2016/02/fruit-vege-2-300x199.jpg",
                            })
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemWrapper: {
    },
    itemTextInputTitle:{
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
    }
});
