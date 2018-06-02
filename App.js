import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShoppingList from './components/ShoppingList';
import EditItem from './components/EditItem';
import NewItem from './components/NewItem';
import SupermarketMap from './components/SupermarketMap';
import TheCamera from './components/TheCamera';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const RootStack = createStackNavigator(
  {
    ShoppingList: ShoppingList,
    NewItem: NewItem,
    EditItem:EditItem,
    SupermarketMap: SupermarketMap,
	  TheCamera: TheCamera,
  },
  {
    initialRouteName: 'ShoppingList',
  }
);
