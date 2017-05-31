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
    this.onBack = this.onBack.bind(this);
    this.onSelect = this.onSelect.bind(this);
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

  onBack() {
    this.navigateBack();
  }  

  navigateBack() {
    this.props.navigator.pop();
  }  

  render() {
    
    return (
      <View style={styles.container}>
        <FavouritesView {...this.state} 
          onSelect={this.onSelect}
          onBack={this.onBack}
        />
      </View>
    );

  }

}
