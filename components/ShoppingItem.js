import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import * as ShoppingAPI from '../utils/ShoppingAPI';
import EditItem from './EditItem';

export default class ShoppingItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    delete() {
        ShoppingAPI.deleteItem(this.props.item.id).then(
            response => {
                this.props.handleDeleteItem(this.props.item) //just to renew the data for frontend
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    render() {
        return (
            <View style={styles.singleItem} >
                <View style={styles.iconWrapper}>
                    <Icon name='edit' onPress={() => {
                        // this.props.navigation.navigate('EditItem',
                        // {
                        //     id: this.props.item.id,
                        //     name: this.props.item.name,
                        //     quantity: this.props.item.quantity,
                        //     des: this.props.item.des,
                        // });

                        this.props.navigation.navigate('EditItem').bind(this);
                    }} />
                    <Icon name='delete' onPress={this.delete.bind(this, this.props.item.id)} />
                </View>
                <View style={styles.itemWrapper}>
                    <Image
                        style={styles.itemImage}
                        source={{ uri: `${this.props.item.image}` }}
                    />
                    <View style={styles.contentWrapper}>
                        <View style={styles.leaveOnEdge}>
                            <Text>{this.props.item.name}</Text>
                            <Text> x{this.props.item.quantity}</Text>
                        </View>
                        <Text>{this.props.item.des}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    singleItem: {
        paddingTop: 10,
        height: 150,
        backgroundColor: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    iconWrapper: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    itemWrapper: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    contentWrapper: {
        paddingLeft: 10,
    },
    itemImage: {
        width: 100,
        height: 100
    },
    leaveOnEdge: {
        flexDirection: 'row',
    },

});
