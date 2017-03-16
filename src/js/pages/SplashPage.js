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
    height: 100
  }
});

export default class SplashPage extends React.Component {

  constructor() {
    super();
    this.state = {
      asyncProcess: false
    };
  }

  _loginClick(props) {
    this._showAsyncIndicator();
    this._doLogin();
  }

  _showAsyncIndicator() {
    const data = {
      asyncProcess: true
    };
    this.setState(data);
  }

  _doLogin() {
    // @TODO change this with real login implementation
    setTimeout(() => {
      this._goToPersonalQuestionsPage();
    }, 100);
  }

  _goToPersonalQuestionsPage(props) {
    this.props.navigator.push({
      id: 'PersonalQuestionsPage',
      name: 'PersonalQuestions',
      passProps: {
        name: props
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={splashImage} style={styles.splashImage}/>
        <SocialIcon 
          title='Sign In With Facebook' 
          style={styles.loginButton} 
          onPress={ () => this._loginClick() } 
          type='facebook'
          loading={this.state.asyncProcess}
          button />  
      </View>
    );
  }

}
