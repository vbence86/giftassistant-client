import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import GiftDetailsView from '../components/GiftDetailsView';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class GiftDetailsPage extends React.Component {

  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
    this.onBuy = this.onBuy.bind(this);
  }

  onRemove() {

  }

  onBuy() {

  }

  navigateToGiftResultPage() {
    this.props.navigator.push({
      id: 'GiftResultPage',
      name: 'GiftResultPage'
    });
  }

  navigateToFavouritesPage() {
    this.props.navigator.push({
      id: 'FavouritesPage',
      name: 'FavouritesPage'
    });
  }

  render() {
    
    return (
      <View style={styles.container}>
        <GiftDetailsView data={this.props.data} onRemove={this.onRemove} onBuy={this.onBuy}/>
      </View>
    );

  }

}
