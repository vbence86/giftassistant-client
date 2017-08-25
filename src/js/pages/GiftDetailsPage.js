import React, { Component } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
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
    const webUrl = this.gift.amazonURL;
    const urlWithoutProtocol = this.gift.amazonURL.replace('https://', '');
    const appUrl = `com.amazon.mobile.shopping://${urlWithoutProtocol}`;
    let url = appUrl;

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        url = webUrl;
      }
      return Linking.openURL(url);
    }).catch(err => console.error('An error occurred', err));
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
