import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import * as ShoppingAPI from '../utils/ShoppingAPI';
const dismissKeyboard = require('dismissKeyboard'); 

export default class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "id": "",
            "name": "",
            "quantity": "",
            "des": "",
        }
    }

    static navigationOptions = {
        title: 'Add Item',
    };

    //create the item
    addItem(body) {
        ShoppingAPI.createItem(body).then(
            response => {
                dismissKeyboard(); 
                alert('Item Has Been Added');
                this.props.navigation.navigate('ShoppingList');  
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    render() {
        return (
            <View style={styles.itemWrapper}>
                <TextInput
                    style={styles.itemTextInput}
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.itemTextInput}
                    placeholder="Quantity"
                    keyboardType='numeric'
                    onChangeText={(quantity) => this.setState({ quantity })}
                    value={this.state.quantity}
                />
                <TextInput
                    style={styles.itemTextInputMultiline}
                    placeholder="Description"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(des) => this.setState({ des })}
                    value={this.state.des}
                />
                <Text>Image</Text>
                <View style={styles.buttonWrapper} >
                    <Button title='Save'
                        buttonStyle={{
                            backgroundColor: "#3c8ffc",
                            width: 100,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                        onPress={
                            this.addItem.bind(this, {
                                "name": this.state.name,
                                "quantity": parseInt(this.state.quantity),
                                "des": this.state.des,
                                "image": "http://peterrabbit.nz/wp-content/uploads/2016/02/fruit-vege-2-300x199.jpg"
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
