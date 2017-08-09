import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
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

    return (
      <View style={styles.container}>
        <View style={styles.navigatorContainer}>
          <BackButton onPress={this.props.onBack} />
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>Favourites</Text>
        </View>        
        {this.renderFavouritesList()}
      </View>
    );
  }

  renderFavouritesList() {
    if (!this.props.favourites) return null;
    return (
      <ScrollView contentContainerStyle={styles.list}>
        {this.props.favourites.map((data, idx) => this.renderRow(data, idx))}
      </ScrollView>
    );
  }

}
