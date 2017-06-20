import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Svg, { LinearGradient, Rect, Defs, Stop } from 'react-native-svg';
import BackButton from './BackButton';

const FONT_SIZE_DEFAULT = 30;
const FONT_SIZE_SMALL = 20;

const styles = StyleSheet.create({
  navigatorContainer: {
    width: '100%', 
    height: 50,
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2', 
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 0
  },
  list: {
    backgroundColor: '#fff'
  },
  listHeader: {
    borderBottomWidth: 1, 
    backgroundColor: '#f7f7f8',
    borderColor: '#c8c7cc'
  },
  listHeaderText: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  svg: { 
    position: 'absolute', 
    zIndex: 0, 
    left: 0, 
    top: 0, 
    width: '100%', 
    height: '100%' 
  }
});

export default class FavouritesView extends React.Component {

  renderRow (data, idx) {
    return (
      <ListItem
        roundAvatar
        key={idx}
        title={data.label}
        subtitle={data.formattedPrice}
        avatar={{uri:data.largeImageURL}}
        onPress={() => {
          this.props.onSelect(data, idx);
        }}
      />
    )
  }

  render() {

    if (!this.props.favourites) return null;
    
    return (
      <View style={styles.container}>
        <Svg style={styles.svg}>
          <Defs> 
            <LinearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%" > 
              <Stop offset="0" stopColor="rgb(255, 255, 255)" stopOpacity="1" />
              <Stop offset="1" stopColor="rgb(156, 199, 255)" stopOpacity="1" />
            </LinearGradient> 
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
        </Svg>
        <View style={styles.navigatorContainer}>
          <BackButton onPress={this.props.onBack} />
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>Favourites</Text>
        </View>        
        <ScrollView contentContainerStyle={styles.list}>
          {this.props.favourites.map((data, idx) => this.renderRow(data, idx))}
        </ScrollView>
      </View>
    );
  }

}
