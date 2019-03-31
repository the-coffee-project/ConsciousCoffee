import React, {Component} from 'react';
import {Image, View, Text, FlatList, StyleSheet} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import {BadgeImages} from 'res/Images.js';
import {LibStyles} from 'library/styles.js';

import customData from 'res/cafe-data.json';
import customBadgeData from 'res/badge-data.json';
const data = customData.cafes;
const badgeData = customBadgeData.badges;

const extractKey = ({id}) => id.toString();

export default class CafeListScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      cafes: data,
    };
    this.updateCafeDistances = this.updateCafeDistances.bind(this);
    this.loadLocation = this.loadLocation.bind(this);
  }

  updateCafeDistances(position) {
    for (i = 0; i < this.state.cafes.length; i++) {
      let item = this.state.cafes[i];
      let distance = 0.0;
      distance = this.calcDistance(position.coords.latitude, position.coords.longitude, item.latitude, item.longitude);
      distance = distance * 0.000621371; // Convert from meters to miles
      distance = Math.round(distance * 10) / 10; // Round to 1st decimal place
      item.distanceText = distance.toString() + " mi";
      item.distance = distance
    }
    let items = [...this.state.cafes];
    items.sort((a, b) => (a.distance - b.distance));
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

  loadLocation() {
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

  componentDidMount() {
    this.loadLocation();
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

  loadBadges(badges) {
    let items = [];
    for (let i = 0; i < badges.length; i++) {
      if (badges[i] == 1) {
        uri = badgeData.nameIDs[i] + "Badge.png";
        items.push({
          key: i,
          name: badgeData.names[i],
          logoURI: uri
        })
      }
    }
    let badgeImageArr = items.map((badge) => (
      <Image style={[LibStyles.badge, styles.badge]} key={badge.key} source={BadgeImages[badge.logoURI]} />
    ));
    if (badgeImageArr.length > 0) {
      badgeImageArr[0].props.style = styles.firstBadge;
    }
    return badgeImageArr;
  }

  renderSeparator = ({leadingItem, highlight}) => {
    return (<View style={styles.separator}></View>);
  }

  renderItem = ({ item }) => {
    let badgeImageArr = this.loadBadges(item.badges);
    return (
      <ListItem
        title={item.name}
        subtitle={
          <View style={styles.subtitleView}>
            <View style={styles.badgesRow}>
              {badgeImageArr}
            </View>
            <Text style={styles.distanceText}>{item.distanceText}</Text>
          </View>
        }
        rightAvatar={<Image style={LibStyles.avatar} source={BadgeImages[item.nameID]} />}
        onPress={() => {this.props.navigation.push('Details', item)}}
        chevronColor="#565656"
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
        contentContainerStyle={{paddingBottom:25, paddingTop: 5}}
        ItemSeparatorComponent={this.renderSeparator}
        onRefresh={this.loadLocation}
        refreshing={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomPadding: {
    paddingBottom: '25%',
  },
  list: {
    flex: 1,
  },
  subtitleView: {
    flexDirection: 'column'
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  separator: {
    height: 1,
    width: '92%',
    marginLeft: '4%',
    backgroundColor: '#CED0CE',
    borderRadius: 1
  },
  distanceText: {
    color: '#565656'
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
  badge: {
    marginLeft: 2,
    marginRight: 2,
    marginTop: 7,
    marginBottom: 7
  },
  firstBadge: {
    width: 20, 
    height: 20,
    marginLeft: 0,
    marginRight: 2,
    marginTop: 7,
    marginBottom: 7
  },
})