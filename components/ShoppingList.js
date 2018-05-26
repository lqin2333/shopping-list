import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import ShoppingItem from './ShoppingItem';
import Header from './Header';
import { Icon } from 'react-native-elements';
import * as ShoppingAPI from '../utils/ShoppingAPI';

export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    static navigationOptions = {
        title: 'My Shopping List',
    };

    add() {
        alert('add');
    }

    deleteItem(item) {
        const recordIndex = this.state.items.indexOf(item);
        const newRecords = this.state.items.filter((item, index) => index !== recordIndex)
        this.setState({
            items: newRecords
        })
    }

    componentDidMount() {
        ShoppingAPI.getAllItems().then(
            response => this.setState({
                items: response.data
            }),
            error => this.setState({
                error  //This is the same with error:error
            })
        )
    }

    render() {
        const items = this.state.items;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {/*<ShoppingItem
                        imageUri="http://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
                        title="this is title"
                        content="content"
                        number="5"
                    />*/}
                    {items.map((item, i) =>
                        <ShoppingItem
                            key={item.id}
                            item={item}
                            handleEditItem={this.deleteItem.bind(this)}
                            handleDeleteItem={this.deleteItem.bind(this)}
                        />
                    )}
                </ScrollView>
                <View style={styles.addIconWrapper}>
                    <TouchableHighlight style={styles.addIcon}>
                        <Icon color="#fff" name='add' onPress={() => {
                            this.props.navigation.navigate('NewItem');
                        }} />
                    </TouchableHighlight>
                </View>
            </View >
        );
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#EBEAF1',
    },
    addItemButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 35
    },
    addIconWrapper: {
        flex: 1,
        top: -10,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addIcon: {
        backgroundColor: '#afafaf',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
});
