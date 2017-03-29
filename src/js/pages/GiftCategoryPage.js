import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import GiftCategoryView from '../components/GiftCategoryView';
import GiftClient from '../helpers/GiftClient';

const appConfig = require('../../../environment.json');

const mockResponse = {
  "response": {
    "listCategory": [
      {
        "id": 1,
        "categoryName": "Books",
        "url": "http://schioppa.com/book.png"
      },
      {
        "id": 2,
        "categoryName": "Music",
        "url": "http://schioppaBazMeg.com/music.png"
      },
      {
        "id": 3,
        "categoryName": "Tech (Electronics - Games)",
        "url": "http://schioppaBazMeg.com/techandgames.png"
      },
      {
        "id": 4,
        "categoryName": "Home",
        "url": "http://schioppaBazMeg.com/home.png"
      },
      {
        "id": 5,
        "categoryName": "Pets",
        "url": "http://schioppaBazMeg.com/pets.png"
      },
      {
        "id": 6,
        "categoryName": "Garden - DIY",
        "url": "http://schioppaBazMeg.com/garden.png"
      },
      {
        "id": 7,
        "categoryName": "Toys - Children - Baby",
        "url": "http://schioppaBazMeg.com/toys.png"
      },
      {
        "id": 8,
        "categoryName": "Clothes & Shoes",
        "url": "http://schioppaBazMeg.com/clothesandshoes.png"
      },
      {
        "id": 9,
        "categoryName": "Jewelry",
        "url": "http://schioppaBazMeg.com/jewelry.png"
      },
      {
        "id": 10,
        "categoryName": "Sports and outdoor",
        "url": "http://schioppaBazMeg.com/sportandoutdoor.png"
      },
      {
        "id": 11,
        "categoryName": "Beauty and Health",
        "url": "http://schioppaBazMeg.com/beautyandhealth.png"
      },
      {
        "id": 12,
        "categoryName": "Car And Bike",
        "url": "http://schioppaBazMeg.com/carandbike.png"
      },
      {
        "id": 13,
        "categoryName": "Handcraft",
        "url": "http://schioppaBazMeg.com/handcraft.png"
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

export default class GiftCategoryPage extends React.Component {

  constructor(props) {
    super(props);

    this.handleAnswer = this.handleAnswer.bind(this);

    this.state = {};
    this.categories = [];
    this.answers = [];
    this.currentCategoryIdx = 0;
  }

  componentDidMount() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = { authenticatedFacebookToken: 'jkfs7583452njfds7238423' };
    client
      .giftCategory(req)
      .then(this.handleResponse.bind(this, mockResponse))
      .catch(this.handleResponse.bind(this, mockResponse));
  }

  handleResponse(resp) {
    this.setCategoriesFromResponse(resp);
    this.setStateByCurrentCategory();
  }

  setCategoriesFromResponse(resp) {
    this.categories = resp.response.listCategory;
  } 

  setStateByCurrentCategory() {
    this.setState(this.categories[this.currentCategoryIdx]);
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
    this.props.navigator.push({
      id: 'GiftResultPage',
      name: 'GiftResultPage'
    });
  }

  render() {
    
    return (
      <View style={styles.container}>
        <GiftCategoryView name={this.state.categoryName} onAnswer={this.handleAnswer}/>
      </View>
    );

  }

}
