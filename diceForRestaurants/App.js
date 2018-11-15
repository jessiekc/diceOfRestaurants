/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Restaurants from './components/Restaurants';
import LocalList from './components/LocalList';
export default class App extends Component<Props> {
  render() {
    return (
        <AppStackNavigator />


    );
  }
}
const AppStackNavigator = createStackNavigator({
    Restaurants: Restaurants,
    LocalList: LocalList,
})