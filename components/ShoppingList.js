import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import ShoppingItem from './ShoppingItem';
import { Icon } from 'react-native-elements';
import * as ShoppingAPI from '../utils/ShoppingAPI';

export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            abc: "123",
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
        this.updateState();
    }

    updateState(){
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
        const _this = this;
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
                            navigation={this.props.navigation}
                            key={item.id}
                            item={item}
                            handleEditItem={this.deleteItem.bind(this)}
                            handleDeleteItem={this.deleteItem.bind(this)}
                            handleUpdateItem={this.updateState.bind(this)}
                        />
                    )}
                </ScrollView>
                <View style={styles.bottomIconsWrapper}>
                    <TouchableHighlight style={styles.mapIcon}>
                        <Icon color="#fff" name='map' onPress={() => {
                            this.props.navigation.navigate('SupermarketMap');
                        }} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.addIcon}>
                        <Icon color="#fff" name='add' onPress={() => {
                            this.props.navigation.navigate('NewItem', {
                                refresh: () => {
                                    this.updateState();
                                }
                            });
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
        marginTop: 5,
        backgroundColor: '#EBEAF1',
    },
    addItemButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 35
    },
    bottomIconsWrapper: {
        flex: 1,
        top: -60,
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10,
    },
    addIcon: {
        backgroundColor: '#afafaf',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapIcon: {
        backgroundColor: '#afafaf',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
