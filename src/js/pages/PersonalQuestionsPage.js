import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import QuestionView from '../components/QuestionView';
import GiftClient from '../helpers/GiftClient';
const appConfig = require('../../../environment.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class PersonalQuestionsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = { authenticatedFacebookToken: 'jkfs7583452njfds7238423' };
    client
      .question(req)
      .then(this._handleResponse.bind(this));
  }

  _handleResponse(resp) {
    const state = resp.response.questions[0];
    this.setState(state);
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.state)}</Text>
        <QuestionView {...this.state} />
      </View>
    );

  }

}
