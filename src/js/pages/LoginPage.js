import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Auth0Lock from 'react-native-lock';
import Session from '../helpers/Session';

const appConfig = require('../../../environment.json');
const lock = new Auth0Lock({ 
  clientId: appConfig.auth0CID, 
  domain: appConfig.auth0Domain 
});

export default class LoginPage extends React.Component {

  componentDidMount() {
    lock.show({}, (err, profile, token) => {

      const session = Session.getInstance();
      session.set('facebookId', '10211657971266827');

      this.navigateToPersonalQuestionsPage();
    });
    
  }

  navigateToPersonalQuestionsPage() {
    this.props.navigator.push({
      id: 'PersonalQuestionsPage',
      name: 'PersonalQuestionsPage'
    });
  }  

  render() {
    return (
      <View />
    );
  }

}
