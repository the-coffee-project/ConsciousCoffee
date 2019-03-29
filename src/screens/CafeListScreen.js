import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {List, ListItem} from 'react-native-elements';

import customData from 'res/cafe-data.json';
const data = customData.cafes;

const extractKey = ({id}) => id.toString()

export default class CafeListScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      cafes: data,
      distance: "none so far",
    };
    this.updateCafeDistances = this.updateCafeDistances.bind(this);
  }

  updateCafeDistances(position) {
    for (i = 0; i < this.state.cafes.length; i++) {
      let item = this.state.cafes[i];
      let distanceText = "";
      let distance = 0.0;
      distance = this.calcDistance(position.coords.latitude, position.coords.longitude, item.latitude, item.longitude);
      distance = distance * 0.000621371; // Convert from meters to miles
      distance = Math.round(distance * 10) / 10; // Round to 1st decimal place
      item.distanceText = distance.toString() + " mi";
    }
    let items = [...this.state.cafes];
    for(let i in items) {
      items[i] = Object.assign({}, items[i]);
    }
    this.setState({
      cafes: items,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      error: null,
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.updateCafeDistances,
      (error) => { 
        for (i = 0; i < this.state.cafes.length; i++) {
          this.state.cafes[i].distanceText = this.state.cafes[i].address;
        }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 },
    );
  }

  calcDistance(lat1, lon1, lat2, lon2) {
    // Convert to radians
    let dLat = (lat2-lat1) * Math.PI / 180;
    let dLon = (lon2-lon1) * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    let R = 6371e3

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        subtitle={item.distanceText}
        onPress={() => {this.props.navigation.push('Details', item)}}
        chevron
      />
    );
  }
  
  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.cafes}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
})