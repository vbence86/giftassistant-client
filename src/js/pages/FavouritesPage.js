import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import FavouritesView from '../components/FavouritesView';
import Favourites from '../helpers/Favourites';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class FavouritesPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.state = {
      favourites: Favourites.getInstance().get()
    };
  }

  onSelect(data, idx) {
    this.navigateToGiftDetailsPage(data, idx)
  }

  navigateToGiftDetailsPage(data, index) {
    this.props.navigator.push({
      id: 'GiftDetailsPage',
      name: 'GiftDetailsPage',
      data,
      index
    });
  }

  render() {
    
    return (
      <View style={styles.container}>
        <FavouritesView {...this.state} onSelect={this.onSelect.bind(this)}/>
      </View>
    );

  }

}
