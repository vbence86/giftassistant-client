import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class LoginView extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <SocialIcon title='Sign In With Facebook' button type='facebook' />  
        <Button title='Guest mode' icon={{ name: 'face' }} large raised />
      </View>
    );
  }

}
