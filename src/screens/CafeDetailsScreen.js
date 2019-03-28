import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class CafeDetailsScreen extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#F5FCFF' }}>
        <Text>{navigation.getParam('name', 'Restaurant')}</Text>
      </View>
    );
  }
}