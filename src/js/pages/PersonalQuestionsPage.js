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
        "input": "select",
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
        "input": "select",
        "values": {
          "MarriageValue:": "Marriage",
          "BirthdayValue:": "Birthday"
        }
      },
      {
        "id": 4,
        "label": "Price Range?",
        "category": "personal",
        "input": "select",
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

    this.handleAnswer = this.handleAnswer.bind(this);

    this.state = {};
    this.questions = [];
    this.answers = [];
    this.currentQuestionIdx = 0;
  }

  componentDidMount() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = { authenticatedFacebookToken: 'jkfs7583452njfds7238423' };
    client
      .question(req)
      .then(this.handleResponse.bind(this, mockResponse))
      .catch(this.handleResponse.bind(this, mockResponse));
  }

  handleResponse(resp) {
    this.saveQuestionsFromResponse(resp);
    this.setStateByCurrentQuestion();
  }

  saveQuestionsFromResponse(resp) {
    this.questions = resp.response.questions;
  } 

  setStateByCurrentQuestion() {
    this.setState(this.questions[this.currentQuestionIdx]);
  }

  nextQuestion() {
    this.currentQuestionIdx += 1;
    if (this.currentQuestionIdx < this.questions.length) {
      this.setStateByCurrentQuestion();
    } else {
      this.lastQuestionIsAnswered();
    }
  }

  handleAnswer(value) {
    this.answers.push({ 
      id: this.questions[this.currentQuestionIdx].id, 
      value 
    });
    this.nextQuestion();
  }

  lastQuestionIsAnswered() {
    this.sendAnswersToGiftService()
      .then(this.navigateToGiftCategoryPage.bind(this))
      .catch(this.navigateToGiftCategoryPage.bind(this));
  }

  sendAnswersToGiftService() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = { 
      facebookId: 'jkfs7583452njfds7238423',
      answers: this.answers 
    };
    return client.answer(req);
  }

  navigateToGiftCategoryPage() {
    this.props.navigator.push({
      id: 'GiftCategoryPage',
      name: 'GiftCategoryPage'
    });
  }

  render() {
    
    return (
      <View style={styles.container}>
        <QuestionView {...this.state} onAnswer={this.handleAnswer}/>
      </View>
    );

  }

}
