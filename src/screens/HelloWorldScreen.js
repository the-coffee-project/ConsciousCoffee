import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class HelloWorldScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#F5FCFF' }}>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
