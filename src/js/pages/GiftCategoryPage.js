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
        "title": "Books",
       "url": "http://schioppa.com/book.png",
      },
      {
       "id": 2,
        "title": "Music",
       "url": "http://schioppaBazMeg.com/music.png",
      },
      {
       "id": 3,
        "title": "Tech (Electronics & Games)",
       "url": "http://schioppaBazMeg.com/techandgames.png",
      },
      {
       "id": 4,
      "title": "Home",
       "url": "http://schioppaBazMeg.com/home.png",
      },
      {
        "id": 5,
        "title": "Pets",
        "url": "http://schioppaBazMeg.com/pets.png",
      },
      {
        "id": 6,
        "title": "Garden  DIY",
        "url": "http://schioppaBazMeg.com/garden.png",
      },
      {
        "id": 7,
        "title": "Toys  Children  Baby",
        "url": "http://schioppaBazMeg.com/toys.png",
      },
      {
        "id": 8,
        "title": "Clothes & Shoes",
        "url": "http://schioppaBazMeg.com/clothesandshoes.png",
      },
      {
        "id": 9,
        "title": "Jewelry",
        "url": "http://schioppaBazMeg.com/jewelry.png"
      },
      {
        "id": 10,
        "title": "Sports and outdoor",
        "url": "http://schioppaBazMeg.com/sportandoutdoor.png",
      },
      {
        "id": 11,
        "title": "Beauty and Health",
        "url": "http://schioppaBazMeg.com/beautyandhealth.png",
      },
      {
        "id": 12,
        "title": "Car And Bike",
        "url": "http://schioppaBazMeg.com/carandbike.png",
      },
      {
        "id": 13,
        "title": "Handcraft",
        "url": "http://schioppaBazMeg.com/handcraft.png",
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

    this.flagCategory = this.flagCategory.bind(this);
    this.generateGifts = this.generateGifts.bind(this);

    this.state = {
      showAsyncLoader: false,
      answers: {},
    };
    this.categories = [];
    this.answers = {};
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
    this.setStateByCategories();
  }

  setCategoriesFromResponse(resp) {
    this.categories = resp.response.listCategory;
  } 

  setStateByCategories() {
    this.setState({categories: this.categories});
  }

  flagCategory({id, value}) {
    this.answers[id] = !!value;
    this.setState({answers: this.answers});
  }

  generateGifts() {
    this.showAsyncLoader();
    this.sendAnswersToGiftService()
      .then(this.navigateToGiftResultPage.bind(this), this.navigateToGiftResultPage.bind(this))
      .then(this.hideAsyncLoader.bind(this));
  }

  sendAnswersToGiftService() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const requests = Object.keys(this.answers).map(id => {
        const req = { 
          facebookId: 'jkfs7583452njfds7238423',
          id,
          flag: this.answers[id],
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
        <GiftCategoryView answers={this.state.answers} categories={this.state.categories} onFlagCategory={this.flagCategory} onComplete={this.generateGifts}/>
      </View>
    );

  }

}
