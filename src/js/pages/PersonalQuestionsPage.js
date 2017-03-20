import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import QuestionView from '../components/QuestionView';
import GiftClient from '../helpers/GiftClient';

const appConfig = require('../../../environment.json');

const mockResponse = {
  "response": {
    "questions": [
      {
        "id": 1,
        "label": "What is his/her age?",
        "category": "personal",
        "input": "slider",
        "values": {
          "min": "1",
          "max": "99"
        }
      },
      {
        "id": 2,
        "label": "Sex?",
        "category": "personal",
        "input": "slider",
        "values": {
          "OtherValue": "Other",
          "FemaleValue": "Female",
          "MaleValue": "Male"
        }
      },
      {
        "id": 3,
        "label": "Purpose?",
        "category": "personal",
        "input": "slider",
        "values": {
          "MarriageValue:": "Marriage",
          "BirthdayValue:": "Birthday"
        }
      },
      {
        "id": 4,
        "label": "Price Range?",
        "category": "personal",
        "input": "slider",
        "values": {
          "Range1Value:": "0-10",
          "Range2Value:": "10-50",
          "Range3Value:": "50-100",
          "Range4Value:": "100-500",
          "Range5Value:": "500-10000"
        }
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
      .then(this._handleResponse.bind(this))
      .catch(this._handleResponse.bind(this, mockResponse));
  }

  _handleResponse(resp) {
    const state = resp.response.questions[0];
    this.setState(state);
  }

  render() {
    
    return (
      <View style={styles.container}>
        <QuestionView {...this.state}/>
      </View>
    );

  }

}
