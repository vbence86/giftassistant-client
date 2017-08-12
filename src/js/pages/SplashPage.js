import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';

const splashImage = require('../../../resources/img/gift-flat.png');

const styles = StyleSheet.create({
  splashImage: {
    marginBottom: 30
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class SplashPage extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    setTimeout(() => {
      this._goToLoginPage();
    }, 1000);
  }

  _goToLoginPage(props) {
    this.props.navigator.push({
      id: 'GiftResultPage',
      name: 'Authorisation',
      passProps: {
        name: props
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={splashImage} style={styles.splashImage}/>
      </View>
    );
  }

}
