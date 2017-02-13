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
  },
  loginButton: {
    width: '75%',
    height: 100,
  }
});

export default class SplashPage extends React.Component {

  constructor() {
    super();
    this.state = {
      asyncProcess: false
    };
  }

  _navigate(property) {
    setTimeout(() => {

    });
    this.props.navigator.push({
      id: 'LoginPage',
      name: 'Login',
      passProps: {
        name: property
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={splashImage} style={styles.splashImage}/>
        <SocialIcon 
          title='Sign In With Facebook' 
          style={styles.loginButton} 
          onPress={ () => this._navigate() } 
          type='facebook'
          loading={this.state.asyncProcess}
          button />  
      </View>
    );
  }

}
