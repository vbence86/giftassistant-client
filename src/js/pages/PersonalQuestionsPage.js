import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import QuestionView from '../components/QuestionView';
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

export default class PersonalQuestionsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleAnswer = this.handleAnswer.bind(this);
    this.session = Session.getInstance();
  }

  componentDidMount() {
    this.showAsyncLoader();
    this.initHelpers();
    this.loadQuestions();
  }

  initHelpers() {
    this.questions = [];
    this.answers = [];
    this.currentQuestionIdx = 0;
  }

  loadQuestions() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const id = this.session.get('facebookId');

    client
      .resetSession({ id })
      .start({ id })
      .question({ id })
      .then(this.handleResponse.bind(this))
      .then(this.hideAsyncLoader.bind(this));
  }

  showAsyncLoader() {
    this.setState({ ...this.state, showAsyncLoader: true });
  }

  hideAsyncLoader() {
    this.setState({ ...this.state, showAsyncLoader: false });
  }

  handleResponse(resp) {
    this.saveQuestionsFromResponse(resp);
    this.setStateByCurrentQuestion();
  }

  saveQuestionsFromResponse(resp) {
    this.questions = resp.response.questions;
  } 

  setStateByCurrentQuestion() {
    const questionDetails = this.questions[this.currentQuestionIdx];
    const isLastQuestion = this.currentQuestionIdx === this.questions.length - 1;
    this.setState({...questionDetails, isLastQuestion });
  }

  handleAnswer(value) {
    this.answers.push({ 
      id: this.questions[this.currentQuestionIdx].id, 
      value 
    });
    this.nextQuestion();
  }

  nextQuestion() {
    this.currentQuestionIdx += 1;
    if (this.currentQuestionIdx < this.questions.length) {
      this.setStateByCurrentQuestion();
    } else {
      this.lastQuestionIsAnswered();
    }
  }

  lastQuestionIsAnswered() {
    this.showAsyncLoader();
    this.sendAnswersToGiftService()
      .then(this.navigateToGiftCategoryPage.bind(this), this.navigateToGiftCategoryPage.bind(this))
      .then(this.hideAsyncLoader.bind(this));
  }

  sendAnswersToGiftService() {
    const client = GiftClient.connect(appConfig.giftServiceURL);
    const req = { 
      facebookId: this.session.get('facebookId'),
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
        <Spinner visible={this.state.showAsyncLoader} overlayColor="rgba(0, 0, 0, 0.75)" />
        <QuestionView {...this.state} onAnswer={this.handleAnswer}/>
      </View>
    );

  }

}
