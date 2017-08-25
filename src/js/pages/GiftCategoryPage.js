import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import GiftCategoryView from '../components/GiftCategoryView';
import GiftClient from '../helpers/GiftClient';
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

export default class GiftCategoryPage extends React.Component {

  constructor(props) {
    super(props);

    this.flagCategory = this.flagCategory.bind(this);
    this.generateGifts = this.generateGifts.bind(this);
    this.session = Session.getInstance();

    this.state = {
      showAsyncLoader: false,
      answers: {},
    };
    this.categories = [];
    this.answers = {};
  }

  componentDidMount() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = { id: this.session.get('facebookId') };

    this.showAsyncLoader();

    client
      .giftCategory(req)
      .then(this.handleResponse.bind(this))
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
      .then(this.navigateToGiftResultPage.bind(this))
      .then(this.hideAsyncLoader.bind(this));
  }

  sendAnswersToGiftService() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const requests = Object.keys(this.answers).map(id => {
        const req = { 
          facebookId: this.session.get('facebookId'),
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
