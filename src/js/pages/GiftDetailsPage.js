import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Favourites from '../helpers/Favourites';
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
    this.gift = this.props.data;
    this.onRemove = this.onRemove.bind(this);
    this.onBuy = this.onBuy.bind(this);
    this.onBack = this.onBack.bind(this);
    this.favourites = Favourites.getInstance();
  }

  onBack() {
    this.navigateBack();
  }

  onRemove() {
    this.favourites.remove(this.gift);
    this.navigateBack();
  }

  onBuy() {

  }

  navigateBack() {
    this.props.navigator.pop();
  }

  render() {
    
    return (
      <View style={styles.container}>
        <GiftDetailsView 
          data={this.gift} 
          onBack={this.onBack}
          onRemove={this.onRemove} 
          onBuy={this.onBuy}/>
      </View>
    );

  }

}