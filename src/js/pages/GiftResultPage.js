import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import GiftResultView from '../components/GiftResultView';
import GiftClient from '../helpers/GiftClient';
import Favourites from '../helpers/Favourites';
import Session from '../helpers/Session';

const appConfig = require('../../../environment.json');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class GiftResultPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleAnswer = this.handleAnswer.bind(this);

    this.session = Session.getInstance();    

    this.state = {
      showAsyncLoader: false
    };
    this.gifts = [];
    this.answers = [];
    this.currentGiftIdx = 0;
    this.favourites = Favourites.getInstance();
  }

  componentDidMount() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = { id: this.session.get('facebookId') };

    client.giftResult(req)
      .then(this.setGiftsFromResponse.bind(this, mockResponse))
      .then(this.preloadImages.bind(this))
      .then(this.setStateByGift.bind(this))
      .then(this.hideAsyncLoader.bind(this));
  }

  setGiftsFromResponse(resp) {
    this.gifts = resp.response.items;
  } 

  preloadImages() {
    const uris = this.gifts.map( v => v.largeImageURL );
    const imagePrefetch = uris.map( uri => Image.prefetch(uri));
    return Promise.all(imagePrefetch);
  }

  setStateByGift() {
    const gift = this.gifts[this.currentGiftIdx];
    const isLastGiftResult = this.currentGiftIdx === this.gifts.length - 1;
    this.setState({ ...gift, isLastGiftResult });
  }

  nextGift() {
    this.currentGiftIdx += 1;
    if (this.currentGiftIdx < this.gifts.length) {
      this.setStateByGift();
    } else {
      this.lastGiftIsFlagged();
    }
  }

  handleAnswer(value) {
    this.answers.push({ 
        asinId: this.gifts[this.currentGiftIdx].asin, 
        value 
    });
    if (value >= 1) {
      this.favourites.add(this.gifts[this.currentGiftIdx]);
    }
    this.nextGift();
  }

  lastGiftIsFlagged() {
    this.showAsyncLoader();
    this.sendAnswersToGiftService()
      .then(this.navigateToGiftResultPage.bind(this))
      .then(this.hideAsyncLoader.bind(this));
  }

  sendAnswersToGiftService() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = {
      facebookId: this.session.get('facebookId'), 
      swipeDecisionList: this.answers 
    };
    return client.answer(req);
  }

  navigateToGiftResultPage() {
    this.props.navigator.push({
      id: 'GiftResultPage',
      name: 'GiftResultPage'
    });
  }

  showAsyncLoader() {
    this.setState({ ...this.state, showAsyncLoader: true });
  }

  hideAsyncLoader() {
    this.setState({ ...this.state, showAsyncLoader: false });
  }  

  render() {
    
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.showAsyncLoader} overlayColor="rgba(0, 0, 0, 0.75)" />
        <GiftResultView {...this.state} onAnswer={this.handleAnswer}/>
      </View>
    );

  }

}
