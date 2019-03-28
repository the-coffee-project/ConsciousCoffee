import React, {Component} from 'react';
import {Text, FlatList, StyleSheet} from 'react-native';
import {List, ListItem} from 'react-native-elements';

import customData from 'res/cafe-data.json';
const rows = customData.cafes;

const extractKey = ({id}) => id.toString()

export default class CafeListScreen extends Component {
  
  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.address}
      onPress={() => {this.props.navigation.push('Details', item)}}
      chevron
    />
  )
  
  render() {
    return (
      <FlatList
        style={styles.container}
        data={rows}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
})