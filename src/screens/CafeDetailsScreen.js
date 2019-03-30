import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import {BadgeImages} from 'res/Images.js'

export default class CafeDetailsScreen extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#F5FCFF' }}>
        <Text>{navigation.getParam('name', 'Restaurant')}</Text>
        <Image source={BadgeImages['fairTradeBadge.png']} />
      </View>
    );
  }
}