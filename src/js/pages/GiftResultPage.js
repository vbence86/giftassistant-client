import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import GiftResultView from '../components/GiftResultView';
import GiftClient from '../helpers/GiftClient';
import Favourites from '../helpers/Favourites';

const appConfig = require('../../../environment.json');

const mockResponse = {
  "response": {
    "items": [
      {
        "asin": "asin1",
        "label": "The Silent Wife: A gripping emotional page turner with a twist that will take your breath away",
        "price": 10,
        "formattedPrice": "$12.85",
        "amazonURL": "amazon.com/shortURL",
        "largeImageURL": "https://images-eu.ssl-images-amazon.com/images/I/51UUcbFtpXL.jpg"
      },
      {
        "asin": "asin1",
        "label": "Rogue One: A Star Wars Story [DVD] [2016] [2017]",
        "price": 9.99,
        "formattedPrice": "$9.99",
        "amazonURL": "amazon.com/shortURL",
        "largeImageURL": "https://images-na.ssl-images-amazon.com/images/I/912ud5CJkEL._SL1500_.jpg"
      },
      {
        "asin": "asin1",
        "label": "Swimming glass",
        "price": 29.99,
        "formattedPrice": "$29.99",
        "amazonURL": "amazon.com/shortURL",
        "largeImageURL": "https://images-na.ssl-images-amazon.com/images/I/61T9Y0Hl98L._SL1000_.jpg"
      }
    ]
  }
};

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
    const req = { authenticatedFacebookToken: 'jkfs7583452njfds7238423' };

    //this.showAsyncLoader();

    this.setGiftsFromResponse(mockResponse);
    this.setStateByGift();
    return;

    client.giftResult(req)
      .then(this.setGiftsFromResponse.bind(this, mockResponse), this.setGiftsFromResponse.bind(this, mockResponse))
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
        id: this.gifts[this.currentGiftIdx].id, 
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
      .then(this.navigateToGiftResultPage.bind(this), this.navigateToGiftResultPage.bind(this))
      .then(this.hideAsyncLoader.bind(this));
  }

  sendAnswersToGiftService() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = { 
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
