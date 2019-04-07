import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, FlatList} from 'react-native';
import {BadgeImages} from 'res/Images.js';
import {ListItem} from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {LibStyles} from 'library/styles.js';
import { showLocation } from 'react-native-map-link'

import customBadgeData from 'res/badge-data.json';
const badgeData = customBadgeData.badges;

const extractKey = ({id}) => id.toString();

export default class CafeDetailsScreen extends Component {

  static navigationOptions = {
    title: 'Details',
  };

  loadBadges(badges) {
    let items = [];
    for (let i = 0; i < badges.length; i++) {
      if (badges[i] == 1) {
        uri = badgeData.nameIDs[i] + "Badge.png";
        items.push({
          id: i,
          name: badgeData.names[i],
          logoURI: uri
        })
      }
    }
    return items;
  }

  renderBadgeListItem({ item }) {
    return (
      <View style={styles.badgeListItem}>
        <Image style={[LibStyles.badge, styles.badge]} source={BadgeImages[item.logoURI]} />
        <Text style={styles.badgeName}>{item.name}</Text>
      </View>
    );
  }

  linkToMaps(address, name, latitude, longitude) {
    showLocation({
      latitude: latitude,
      longitude: longitude,
      title: name,  // optional
      googleForceLatLon: true,  // optionally force GoogleMaps to use the latlon for the query instead of the title
    })
  }

  render() {
    const navigation = this.props.navigation;
    let cafe = {
      name: navigation.getParam('name', ''),
      nameID: navigation.getParam('nameID', ''),
      hours: navigation.getParam('hours', ''),
      address: navigation.getParam('address', ''),
      badges: navigation.getParam('badges', ''),
      tradeDescription: navigation.getParam('tradeDescription', ''),
      cafeDescription: navigation.getParam('cafeDescription', ''),
      latitude: navigation.getParam('latitude', ''),
      longitude: navigation.getParam('longitude', ''),
    }

    let badges = this.loadBadges(cafe.badges);

    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={[styles.titleContainer, styles.paddingContainer]}>
          <Image style={[LibStyles.avatar, styles.avatar]} source={BadgeImages[cafe.nameID]} />
          <Text style={[LibStyles.title, styles.title]}>{cafe.name}</Text>
        </View>
        <ListItem 
          style={[styles.addressContainer, styles.paddingContainer]}
          component={TouchableOpacity}
          underlayColor={"transparent"}
          activeOpacity={0.6}
          containerStyle={styles.addressContainer}
          title={<Text style={styles.address}>{cafe.address}</Text>}
          onPress={() => this.linkToMaps(cafe.address, cafe.name, cafe.latitude, cafe.longitude)}
          chevron
        />
        <View style={styles.paddingContainer}>
          <Text style={styles.cafeDescription}>{cafe.cafeDescription}</Text>
          <FlatList
            style={styles.badgeList}
            data={badges}
            keyExtractor={extractKey}
            renderItem={this.renderBadgeListItem}
            scrollEnabled={false}
          />
          <Text style={[styles.cafeDescription, styles.tradeDescription]}>
            <Text style={styles.bold}>Trade Description: </Text>
            {cafe.tradeDescription}
          </Text>
          <View style={styles.bottomPadding}></View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  paddingContainer: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  titleContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addressContainer: {
    width: '100%',
    marginTop: 10,
    paddingLeft: 2,
  },
  address: {
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    fontSize: 15,
    color: '#0191c1',
  },
  cafeDescription: {
    marginLeft: 0,
    marginTop: 20,
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 18,
    color: '#4c4c4c',
  },
  tradeDescription: {
    marginTop: 25
  },
  avatar: {

  },
  title: {
    marginTop: 0,
    marginLeft: 25,
    marginRight: 20,
    flexWrap: 'wrap',
    fontSize: 22,
    lineHeight: 30,
    fontFamily: 'System',
    fontWeight: '500',
  },
  badgeList: {
    marginTop: 10,
    marginLeft: 0,
  },
  badgeListItem: {
    margin: 0,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  badgeName: {
    marginLeft: 10,
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 18,
    color: '#111111',
  },
  badge: {
    margin: 0,
    width: 25,
    aspectRatio: 1,
  },
  bold: {
    fontWeight: '600',
    color: '#111111',
  },
  bottomPadding: {
    paddingBottom: '25%',
  },
});