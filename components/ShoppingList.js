import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import ShoppingItem from './ShoppingItem';
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
                error
            })
        )
    }

    render() {
        const items = this.state.items;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {items.map((item, i) =>
                        <ShoppingItem
                            navigation={this.props.navigation}
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
                <View style={styles.mapIconWrapper}>
                    <TouchableHighlight style={styles.mapIcon}>
                        <Icon color="#fff" name='map' onPress={() => {
                            this.props.navigation.navigate('Map');
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
    addIconWrapper: {
        flex: 1,
        top: -40,
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

    mapIconWrapper: {
        flex: 1,
        top: -40,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapIcon: {
        backgroundColor: '#afafaf',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
});
