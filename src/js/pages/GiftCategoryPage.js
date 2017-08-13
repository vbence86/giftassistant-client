import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import GiftCategoryView from '../components/GiftCategoryView';
import GiftClient from '../helpers/GiftClient';

const appConfig = require('../../../environment.json');

const mockResponse = {
  "response": {
    "listCategory": [
      {
        "id": 1,
        "categoryName": "Does she read often?",
        "url": "http://schioppa.com/book.png"
      },
      {
        "id": 2,
        "categoryName": "Does the person like cars?",
        "url": "http://schioppaBazMeg.com/music.png"
      },
      {
        "id": 3,
        "categoryName": "Does the person spend too much time in front of the computer?",
        "url": "http://schioppaBazMeg.com/techandgames.png"
      },
      {
        "id": 4,
        "categoryName": "Does the person like rearranging the room ever so often?",
        "url": "http://schioppaBazMeg.com/home.png"
      },
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

export default class GiftCategoryPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleAnswer = this.handleAnswer.bind(this);

    this.state = {
      showAsyncLoader: false
    };
    this.categories = [];
    this.answers = [];
    this.currentCategoryIdx = 0;
  }

  componentDidMount() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = { authenticatedFacebookToken: 'jkfs7583452njfds7238423' };

    this.showAsyncLoader();

    client
      .giftCategory(req)
      .then(this.handleResponse.bind(this, mockResponse), this.handleResponse.bind(this, mockResponse))
      .then(this.hideAsyncLoader.bind(this));
  }

  handleResponse(resp) {
    this.setCategoriesFromResponse(resp);
    this.setStateByCurrentCategory();
  }

  setCategoriesFromResponse(resp) {
    this.categories = resp.response.listCategory;
  } 

  setStateByCurrentCategory() {
    const category = this.categories[this.currentCategoryIdx];
    const isLastCategory = this.currentCategoryIdx === this.categories.length - 1;
    this.setState({ ...category, isLastCategory });
  }

  nextCategory() {
    this.currentCategoryIdx += 1;
    if (this.currentCategoryIdx < this.categories.length) {
      this.setStateByCurrentCategory();
    } else {
      this.lastCategoryIsFlagged();
    }
  }

  handleAnswer(value) {
    this.answers.push({ id: this.categories[this.currentCategoryIdx].id, value });
    this.nextCategory();
  }

  lastCategoryIsFlagged() {
    this.showAsyncLoader();
    this.sendAnswersToGiftService()
      .then(this.navigateToGiftResultPage.bind(this), this.navigateToGiftResultPage.bind(this))
      .then(this.hideAsyncLoader.bind(this));
  }

  sendAnswersToGiftService() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const requests = this.answers.map(({id, flag}) => {
        const req = { 
          facebookId: 'jkfs7583452njfds7238423',
          id,
          flag
        };
        return client.flagGiftCategory(req);
      });
    return Promise.all(requests);
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
        <GiftCategoryView isLastCategory={this.state.isLastCategory} name={this.state.categoryName} onAnswer={this.handleAnswer}/>
      </View>
    );

  }

}
