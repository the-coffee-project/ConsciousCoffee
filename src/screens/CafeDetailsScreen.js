import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, FlatList} from 'react-native';
import {BadgeImages} from 'res/Images.js';
import {ListItem} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {LibStyles} from 'library/styles.js';

import customBadgeData from 'res/badge-data.json';
const badgeData = customBadgeData.badges;

const extractKey = ({id}) => id.toString();

export default class CafeDetailsScreen extends Component {

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
        <View style={styles.titleContainer}>
          <Image style={[LibStyles.avatar, styles.avatar]} source={BadgeImages[cafe.nameID]} />
          <Text style={[LibStyles.title, styles.title]}>{cafe.name}</Text>
        </View>
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
      </ScrollView>
      /*<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#F5FCFF' }}>
        <Text>{cafe.name}</Text>
        <Image source={BadgeImages['fairTradeBadge.png']} />
      </View>*/
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: '5%',
  },
  titleContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cafeDescription: {
    marginLeft: 5,
    marginTop: 40,
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