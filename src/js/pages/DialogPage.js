import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements'
import GiftClient from '../helpers/GiftClient';
const appConfig = require('../../../environment.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class DialogPage extends React.Component {

  constructor() {
    super();
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
    this.setState({ text: JSON.stringify(resp) });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
      </View>
    );
  }

}
